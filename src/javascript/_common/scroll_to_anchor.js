const ScrollToAnchor = (() => {
    const init = () => {
        console.log('my scroll');
        scrollToElement();
        addAnchorsToElements();
    };

    const makeAnchorLink = (id) => {
        const anchor_link = document.createElement('a');
        const { origin, pathname, hash } = window.location;
        anchor_link.href = `${origin}${pathname}?anchor=${encodeURI(id)}${hash}`;
        anchor_link.innerText = '#';
        return anchor_link;
    };

    const addAnchorsToElements = () => {
        const els = document.querySelectorAll('[data-anchor]');
        els.forEach(el => {
            const id = el.dataset.anchor;
            const anchor_link = makeAnchorLink(id);
            el.appendChild(anchor_link);
        });
    };

    const scrollToElement = () => {
        const query = getQueryObject(window.location.search);
        const id = query.anchor;
        const el = document.querySelector(`[data-anchor="${id}"]`);
        console.log('query id ->', id);
        console.log('el ->', el);
        $.scrollTo(el, 500);
    };

    const getQueryObject = (query_string) => query_string
        .slice(1)
        .split('&')
        .map(pair => pair.split('='))
        .reduce((obj, [ key, val ]) => {
            obj[key] = window.decodeURI(val);
            return obj;
        }, {});

    return {
        init,
        getQueryObject,
    };
})();

module.exports = ScrollToAnchor;