export const updateObject = (oldObject, updatedProperties) => {
    return {
        // deep cloning
        ...oldObject,
        ...updatedProperties
    };
};