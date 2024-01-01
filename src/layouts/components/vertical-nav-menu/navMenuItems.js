export default [
    {
        header: 'Participants',
        icon: 'SmileIcon',
        i18n: 'Participants',
        items: [
            {
                url: '/participants/list',
                name: 'List',
                slug: 'participants-list',
                icon: 'FileIcon',
                i18n: 'List'
            }
        ]
    },
    {
        header: 'General',
        icon: 'SmileIcon',
        i18n: 'General',
        items: [
            {
                url: '/settings/general/',
                name: 'General',
                slug: 'settings',
                icon: 'SettingsIcon',
                i18n: 'General'
            },
            {
                url: '/settings/validate/',
                name: 'Validate',
                slug: 'validate',
                icon: 'CameraIcon',
                i18n: 'Validate'
            }
        ]
    }
]

