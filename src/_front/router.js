import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"8b0e4c63-43e6-4464-93e1-727e9cf66958","homePageId":"e0268f12-814f-44a5-bd4a-40e7823b6bcc","authPluginId":null,"baseTag":{},"defaultTheme":"light","langs":[{"lang":"fr","default":true}],"background":{"backgroundColor":"var(--26364918-d877-495f-a0fe-50c2cd8bf783,#101010)"},"workflows":[{"id":"76284a2a-e1e4-434c-9623-c3eacd7c2aa4","name":"Hide Loader","actions":{"7a5c8b4c-e0db-46c0-9a11-56f9ccbf2935":{"id":"7a5c8b4c-e0db-46c0-9a11-56f9ccbf2935","next":"9196a0a8-0be7-443e-88ad-032a2a890a26","type":"variable","varId":"ceff411b-d236-4d10-a75e-ae097f89693e","internal":false,"varValue":false},"9196a0a8-0be7-443e-88ad-032a2a890a26":{"id":"9196a0a8-0be7-443e-88ad-032a2a890a26","code":"// Sélectionne toutes les div scrollables\n  const scrollables = document.querySelectorAll('.wrapper-scrollable');\n\n  scrollables.forEach(div => {\n    div.scrollTo({\n      top: 0,\n      behavior: 'smooth'\n    });\n  });","type":"custom-js"}},"trigger":"onload","firstAction":"7a5c8b4c-e0db-46c0-9a11-56f9ccbf2935","triggerConditions":null},{"id":"24f86a42-c40a-4296-be44-85978d58adc7","name":"Randomizing Tools","actions":{"748a6636-be26-40bf-a342-3ee000508824":{"id":"748a6636-be26-40bf-a342-3ee000508824","code":"console.log(`\n\n      =-................-                     \n     : -.                -                    \n     -  -                 -                   \n    :    -                 -                  \n   :      =                 :.                \n   =      .+========+******+=#-               \n   ::     =@@@@@@@@@@@@@@@@@@@%               \n    ::   .@@@@@@@@@@@@@@@@@@@@@               \n     :: #@@@@@@@%@@@@@@@@% @@@-               \n       :+@@@@@@@# @@@@@@@@@@@@@-              \n       +@@@@@@@@@@@@@@@%@@@@@@@:              \n      .@@@@@@@@@@@@@@@-  -@@@@@               \n      %@@@@@@@@@@@@@@*  . -@@@*               \n     =@@@@@@@@@@@@@@@#....#@@@-               \n    :@@@@@@@@@@@@@@@@@#++%@@@@-               \n    *@@@@@@@@@@@@@@@@@@@@@@@@@:               \n   -@@@@@@@@@@@@@@@@@@@@@@@@@@.               \n  .@@@@@@@@@@@@@@@@@@@@@@@@@@*                \n =@@@@@@@@@@@@@@@@@@@@@@@@@@%                 \n.@@@@@@@@@@@@@@@@@@@@@@@@@@@-                 \n .+%@@@@@@@@@@@@@@@@@@@@@@@@:                 \n     .:-=+=++**#%@@@@@@@#*-                    \n                   .:--.\n\n\nHi !\ncontact@martinblevy.com\n`);","name":"Hello World","next":"a355f75c-379f-4fae-808c-29ac7488e581","type":"custom-js"},"a355f75c-379f-4fae-808c-29ac7488e581":{"id":"a355f75c-379f-4fae-808c-29ac7488e581","type":"variable","varId":"61499e8f-be0b-4ac9-b7eb-f11ac603eead","internal":false,"varValue":{"code":"formulas['8d17d890-23e6-4cfb-8735-555c7b0ab91a'](collections['89c72590-e052-499f-a098-36a133159de4']?.['data']?.['results'])","__wwtype":"f"}}},"trigger":"onload-app","firstAction":"748a6636-be26-40bf-a342-3ee000508824"}],"pages":[{"id":"6e14ca3d-43b5-4a63-9a1f-ee2bac256ae5","linkId":"6e14ca3d-43b5-4a63-9a1f-ee2bac256ae5","name":"Pl4ygr0unds","folder":null,"paths":{"fr":"pl4ygr0und","default":"pl4ygr0und"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"b18e9903-8919-4ea5-8693-1ccc28ad2fbb","sectionTitle":"Loader","linkId":"312d44f7-6470-40c8-8715-275d01a89e7f"},{"uid":"46745ba4-b621-4b33-9acb-17d4747d1ae8","sectionTitle":"Layers","linkId":"56ccb449-1d6c-4c99-9613-51593113e0a5"},{"uid":"cda5d2d4-d1bd-409b-a1ae-21db25fc0d34","sectionTitle":"Header","linkId":"c45601f8-7a5e-423d-a961-0a69320d2b55"}],"pageUserGroups":[],"title":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"meta":{"desc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"keywords":{},"socialDesc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"socialTitle":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"structuredData":{}},"metaImage":"images/mbl_favicon.webp?_wwcv=134"},{"id":"be5386a4-42af-4fc5-8299-c9b709dfe2d8","linkId":"be5386a4-42af-4fc5-8299-c9b709dfe2d8","name":"Projets","folder":null,"paths":{"fr":"projets","default":"projets"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"b18e9903-8919-4ea5-8693-1ccc28ad2fbb","sectionTitle":"Loader","linkId":"312d44f7-6470-40c8-8715-275d01a89e7f"},{"uid":"46745ba4-b621-4b33-9acb-17d4747d1ae8","sectionTitle":"Layers","linkId":"56ccb449-1d6c-4c99-9613-51593113e0a5"},{"uid":"cda5d2d4-d1bd-409b-a1ae-21db25fc0d34","sectionTitle":"Header","linkId":"c45601f8-7a5e-423d-a961-0a69320d2b55"}],"pageUserGroups":[],"title":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"meta":{"desc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"keywords":{},"socialDesc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"socialTitle":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"structuredData":{}},"metaImage":"images/mbl_favicon.webp?_wwcv=134"},{"id":"ad6eef8d-0a8f-4a14-a2dd-16e552512889","linkId":"ad6eef8d-0a8f-4a14-a2dd-16e552512889","name":"playground","folder":"page details/","paths":{"fr":"playground/{{slug|joparige-films}}","default":"playground/{{slug|joparige-films}}"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"b18e9903-8919-4ea5-8693-1ccc28ad2fbb","sectionTitle":"Loader","linkId":"312d44f7-6470-40c8-8715-275d01a89e7f"},{"uid":"8036cac7-c1d5-4ea8-9110-0cf871984d37","sectionTitle":"Section","linkId":"213c92c3-999d-4239-aac0-5a0e2f2995f5"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"dad45efc-1e75-4003-9875-c7d47ecdb9be","linkId":"dad45efc-1e75-4003-9875-c7d47ecdb9be","name":"Services","folder":null,"paths":{"fr":"services","default":"services"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"b18e9903-8919-4ea5-8693-1ccc28ad2fbb","sectionTitle":"Loader","linkId":"312d44f7-6470-40c8-8715-275d01a89e7f"},{"uid":"46745ba4-b621-4b33-9acb-17d4747d1ae8","sectionTitle":"Layers","linkId":"56ccb449-1d6c-4c99-9613-51593113e0a5"},{"uid":"cda5d2d4-d1bd-409b-a1ae-21db25fc0d34","sectionTitle":"Header","linkId":"c45601f8-7a5e-423d-a961-0a69320d2b55"}],"pageUserGroups":[],"title":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"meta":{"desc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"keywords":{},"socialDesc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"socialTitle":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"structuredData":{}},"metaImage":"images/mbl_favicon.webp?_wwcv=134"},{"id":"e0268f12-814f-44a5-bd4a-40e7823b6bcc","linkId":"e0268f12-814f-44a5-bd4a-40e7823b6bcc","name":"Home","folder":null,"paths":{"fr":"home","default":"home"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"b18e9903-8919-4ea5-8693-1ccc28ad2fbb","sectionTitle":"Loader","linkId":"312d44f7-6470-40c8-8715-275d01a89e7f"},{"uid":"46745ba4-b621-4b33-9acb-17d4747d1ae8","sectionTitle":"Layers","linkId":"56ccb449-1d6c-4c99-9613-51593113e0a5"},{"uid":"cda5d2d4-d1bd-409b-a1ae-21db25fc0d34","sectionTitle":"Header","linkId":"c45601f8-7a5e-423d-a961-0a69320d2b55"}],"pageUserGroups":[],"title":{"en":"MARTIN B. LEVY |  Product Builder","fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"meta":{"desc":{"en":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugins Bubble, API...","fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"keywords":{},"socialDesc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"socialTitle":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"structuredData":{}},"metaImage":"images/mbl_favicon.webp?_wwcv=134"},{"id":"54a6b665-0dfc-43c0-8ea8-7779f8acd68c","linkId":"54a6b665-0dfc-43c0-8ea8-7779f8acd68c","name":"Contact","folder":null,"paths":{"fr":"contact","default":"contact"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"b18e9903-8919-4ea5-8693-1ccc28ad2fbb","sectionTitle":"Loader","linkId":"312d44f7-6470-40c8-8715-275d01a89e7f"},{"uid":"46745ba4-b621-4b33-9acb-17d4747d1ae8","sectionTitle":"Layers","linkId":"56ccb449-1d6c-4c99-9613-51593113e0a5"},{"uid":"cda5d2d4-d1bd-409b-a1ae-21db25fc0d34","sectionTitle":"Header","linkId":"c45601f8-7a5e-423d-a961-0a69320d2b55"}],"pageUserGroups":[],"title":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"meta":{"desc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"keywords":{},"socialDesc":{"fr":"Façonnons ensemble votre présence numérique !\nSAAS, Application, Outil interne, MVP, Expertise, UX/UI, Maintenance/Update, Plugin Bubble, API..."},"socialTitle":{"fr":"MARTIN B. LEVY | Product Builder freelance à Marseille"},"structuredData":{}},"metaImage":"images/mbl_favicon.webp?_wwcv=134"},{"id":"68d7f633-29a9-47c0-bd92-ef076b8e59b3","linkId":"68d7f633-29a9-47c0-bd92-ef076b8e59b3","name":"projet","folder":"page details/","paths":{"fr":"projet/{{slug|joparige-films}}","default":"projet/{{slug|joparige-films}}"},"langs":["fr"],"cmsDataSetPath":null,"sections":[{"uid":"b18e9903-8919-4ea5-8693-1ccc28ad2fbb","sectionTitle":"Loader","linkId":"312d44f7-6470-40c8-8715-275d01a89e7f"},{"uid":"42273ec3-1511-4283-9b10-a649a3c04e08","sectionTitle":"Section","linkId":"35359364-f52b-48a8-b542-cabb80fa1491"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 134;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = true;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        // TODO: add staging2 ?
        '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
