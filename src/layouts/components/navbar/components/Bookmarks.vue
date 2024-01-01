<template>
    <div class="navbar-bookmarks flex items-center">
        <!-- STARRED PAGES - FIRST 10 -->
        <ul class="vx-navbar__starred-pages">
            <draggable v-model="starredPagesLimited" :group="{name: 'pinList'}" class="flex cursor-move">
                <li class="starred-page" v-for="page in starredPagesLimited" :key="page.url">
                    <vx-tooltip :text="page.title" position="bottom" delay=".3s">
                        <feather-icon :svgClasses="['h-6 w-6 stroke-current', textColor]" class="p-2 cursor-pointer"
                                      :icon="page.icon" @click="$router.push(page.url).catch(() => {})"/>
                    </vx-tooltip>
                </li>
            </draggable>
        </ul>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        props: {
            navbarColor: {
                type: String,
                default: '#fff'
            }
        },
        components: {
            draggable
        },
        data() {
            return {
                showBookmarkPagesDropdown: false
            }
        },
        watch: {
            '$route'() {
                if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
            }
        },
        computed: {
            navbarSearchAndPinList() {
                return {pages: this.$store.state.navbarSearchAndPinList['pages']}
            },
            starredPages() {
                return this.$store.state.starredPages
            },
            starredPagesLimited: {
                get() {
                    return this.starredPages.slice(0, 10)
                },
                set(list) {
                    this.$store.dispatch('arrangeStarredPagesLimited', list)
                }
            },
            starredPagesMore: {
                get() {
                    return this.starredPages.slice(10)
                },
                set(list) {
                    this.$store.dispatch('arrangeStarredPagesMore', list)
                }
            },
            textColor() {
                return {'text-white': this.$store.state.mainLayoutType === 'vertical' && this.navbarColor !== (this.$store.state.theme === 'dark' ? '#10163a' : '#fff')}
            }
        },
        methods: {
            selected(obj) {
                this.$store.commit('TOGGLE_CONTENT_OVERLAY', false)
                this.showBookmarkPagesDropdown = false
                this.$router.push(obj.pages.url).catch(() => {
                })
            },
            actionClicked(item) {
                this.$store.dispatch('updateStarredPage', {url: item.url, val: !item.is_bookmarked})
                // this.$refs.bookmarkAutoSuggest.filterData()
            },
            outside() {
                this.showBookmarkPagesDropdown = false
            },
            hnd_search_query_update(query) {
                // Show overlay if any character is entered
                this.$store.commit('TOGGLE_CONTENT_OVERLAY', !!query)
            }
        },
        directives: {
            'click-outside': {
                bind(el, binding) {
                    const bubble = binding.modifiers.bubble
                    const handler = (e) => {
                        /* eslint-disable no-mixed-operators */
                        if (bubble || !el.contains(e.target) && el !== e.target) {
                            /* eslint-enable no-mixed-operators */
                            binding.value(e)
                        }
                    }
                    el.__vueClickOutside__ = handler
                    document.addEventListener('click', handler)
                },

                unbind(el) {
                    document.removeEventListener('click', el.__vueClickOutside__)
                    el.__vueClickOutside__ = null

                }
            }
        }
    }

</script>
