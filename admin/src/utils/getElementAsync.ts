export const getElementAsync = async (
    selector: string,
    retries = 10,
    delay = 10
) => {
    return new Promise((resolve) => {
        const attempt = (retryCount: any) => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            if (retryCount >= retries) {
                return resolve(undefined);
            }

            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });

            setTimeout(() => {
                observer.disconnect();
                attempt(retryCount + 1);
            }, delay);
        };

        attempt(0);
    });
};
