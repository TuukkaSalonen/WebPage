import { metaData } from './metaConstants.ts';

// Format database date string to locale date string
export const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
};

// Set meta tags for each page
export const setMetaTags = (path: string) => {
    let meta = metaData[path];
    if (!meta) {
        if (path.startsWith('/reset-password')) {
            meta = metaData['/reset-password'];
        } else {
            meta = metaData.default;
        }
    }
    return meta;
};
