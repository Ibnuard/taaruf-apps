export const ANIMATION_SPRING_CONFIG = {
    duration: 300,
    create: {
        type: 'linear',
        property: 'opacity',
    },
    update: {
        type: 'spring',
        springDamping: 0.9,
    },
    delete: {
        type: 'linear',
        property: 'opacity',
        duration: 50,
    },
};