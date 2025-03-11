Run npm run build

> eu@0.0.1 build
> astro check && astro build

23:47:16 [types] Added src/env.d.ts type declarations.
23:47:16 [types] Added src/env.d.ts type declarations.
23:47:16 Types generated 384ms
23:47:16 [check] Getting diagnostics for Astro files in /home/runner/work/eu.zentala.io/eu.zentala.io...
postcss.config.js:1:1 - warning ts(80001): File is a CommonJS module; it may be converted to an ES module.

1 module.exports = {
  ~~~~~~~~~~~~~~

site-tester.js:3:7 - warning ts(6133): 'path' is declared but its value is never read.

3 const path = require('path');
        ~~~~
site-tester.js:1:14 - warning ts(80001): File is a CommonJS module; it may be converted to an ES module.

1 const http = require('http');
               ~~~~~~~~~~~~~~~

functions/newsletter/src/main.js:1:39 - warning ts(6133): 'Users' is declared but its value is never read.

1 import { Client, Databases, ID, Mail, Users } from 'node-appwrite';
                                        ~~~~~

src/components/EUStatisticsChart.astro:59:9 - warning astro(4000): This script will be treated as if it has the `is:inline` directive because it contains an attribute. Therefore, features that require processing (e.g. using TypeScript or npm packages in the script) are unavailable.

See docs for more details: https://docs.astro.build/en/guides/client-side-scripts/#script-processing.

Add the `is:inline` directive explicitly to silence this hint.

59 <script define:vars={{ chartId, chartType, data, xAxisLabel, yAxisLabel, darkMode, defaultColors }}>
           ~~~~~~~~~~~
src/components/EUStatisticsChart.astro:92:41 - warning ts(2570): Could not find name 'chartId'. Did you mean 'Chart'?

92     const ctx = document.getElementById(chartId).getContext('2d');
                                           ~~~~~~~

src/components/EuropeMap.astro:264:5 - error ts(2531): Object is possibly 'null'.

264     document.getElementById('europeMap').setAttribute('data-countries', JSON.stringify(countriesData));
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/components/EuropeMap.astro:258:30 - error ts(7006): Parameter 'layer' implicitly has an 'any' type.

258       geoJsonLayer.eachLayer(layer => {
                                 ~~~~~
src/components/EuropeMap.astro:257:7 - error ts(18047): 'countryInfo' is possibly 'null'.

257       countryInfo.classList.add('hidden');
          ~~~~~~~~~~~
src/components/EuropeMap.astro:245:15 - error ts(18047): 'countryInfo' is possibly 'null'.

245               countryInfo.classList.remove('hidden');
                  ~~~~~~~~~~~
src/components/EuropeMap.astro:237:21 - error ts(7006): Parameter 'e' implicitly has an 'any' type.

237             click: (e) => {
                        ~
src/components/EuropeMap.astro:235:15 - error ts(18047): 'countryInfo' is possibly 'null'.

235               countryInfo.classList.add('hidden');
                  ~~~~~~~~~~~
src/components/EuropeMap.astro:233:24 - error ts(7006): Parameter 'e' implicitly has an 'any' type.

233             mouseout: (e) => {
                           ~
src/components/EuropeMap.astro:231:15 - error ts(18047): 'countryInfo' is possibly 'null'.

231               countryInfo.classList.remove('hidden');
                  ~~~~~~~~~~~
src/components/EuropeMap.astro:228:17 - error ts(18047): 'countryBenefits' is possibly 'null'.

228                 countryBenefits.appendChild(li);
                    ~~~~~~~~~~~~~~~
src/components/EuropeMap.astro:225:44 - error ts(7006): Parameter 'benefit' implicitly has an 'any' type.

225               countryData.benefits.forEach(benefit => {
                                               ~~~~~~~
src/components/EuropeMap.astro:222:15 - error ts(18047): 'countryBenefits' is possibly 'null'.

222               countryBenefits.innerHTML = '';
                  ~~~~~~~~~~~~~~~
src/components/EuropeMap.astro:221:15 - error ts(18047): 'countryName' is possibly 'null'.

221               countryName.textContent = countryData.name;
                  ~~~~~~~~~~~
src/components/EuropeMap.astro:212:25 - error ts(7006): Parameter 'e' implicitly has an 'any' type.

212             mouseover: (e) => {
                            ~
src/components/EuropeMap.astro:204:48 - error ts(7006): Parameter 'c' implicitly has an 'any' type.

204         const countryData = countriesData.find(c =>
                                                   ~
src/components/EuropeMap.astro:202:32 - error ts(7006): Parameter 'layer' implicitly has an 'any' type.

202       onEachFeature: (feature, layer) => {
                                   ~~~~~
src/components/EuropeMap.astro:202:23 - error ts(7006): Parameter 'feature' implicitly has an 'any' type.

202       onEachFeature: (feature, layer) => {
                          ~~~~~~~
src/components/EuropeMap.astro:189:48 - error ts(7006): Parameter 'c' implicitly has an 'any' type.

189         const countryData = countriesData.find(c =>
                                                   ~
src/components/EuropeMap.astro:187:15 - error ts(7006): Parameter 'feature' implicitly has an 'any' type.

187       style: (feature) => {
                  ~~~~~~~
src/components/EuropeMap.astro:178:38 - error ts(2531): Object is possibly 'null'.

178     const countriesData = JSON.parse(document.getElementById('europeMap').getAttribute('data-countries') || '[]');
                                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/components/EuropeMap.astro:154:7 - error ts(2531): Object is possibly 'null'.

154       document.getElementById('europeMap').innerHTML = '<div class="p-4 text-center text-gray-300">Failed to load map data. Please try again later.</div>';
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/components/EuropeMap.astro:143:28 - error ts(7016): Could not find a declaration file for module 'leaflet'. '/home/runner/work/eu.zentala.io/eu.zentala.io/node_modules/leaflet/dist/leaflet-src.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/leaflet` if it exists or add a new declaration (.d.ts) file containing `declare module 'leaflet';`

143     const L = await import('leaflet').then(module => module.default || module);
                               ~~~~~~~~~
src/components/EuropeMap.astro:109:7 - warning ts(6133): 'allCountries' is declared but its value is never read.

109 const allCountries = countries.length > 0 ? countries : defaultCountries;
          ~~~~~~~~~~~~
src/components/EuropeMap.astro:20:3 - warning ts(6133): 'highlightColor' is declared but its value is never read.

20   highlightColor = "rgba(74, 222, 128, 0.8)",
     ~~~~~~~~~~~~~~
src/components/EuropeMap.astro:19:3 - warning ts(6133): 'defaultColor' is declared but its value is never read.

19   defaultColor = "rgba(65, 90, 160, 0.7)",
     ~~~~~~~~~~~~

src/components/FAQ.astro:43:23 - warning ts(6133): 'index' is declared but its value is never read.

43     {items.map((item, index) => (
                         ~~~~~

src/components/Footer.astro:8:7 - warning ts(6133): 'isDevelopment' is declared but its value is never read.

8 const isDevelopment = import.meta.env.DEV;
        ~~~~~~~~~~~~~

src/components/WhyDigitalReform.astro:10:5 - warning ts(6133): 'borderColorClass' is declared but its value is never read.

10 let borderColorClass = "border-gray-700/50";
       ~~~~~~~~~~~~~~~~
src/components/WhyDigitalReform.astro:9:5 - warning ts(6133): 'bgColorClass' is declared but its value is never read.

9 let bgColorClass = "bg-gray-800/30";
      ~~~~~~~~~~~~

src/pages/benefits.astro:626:44 - error ts(2339): Property 'dataset' does not exist on type 'never'.

626         const countryName = lastMatchedTab.dataset.countryName || '';
                                               ~~~~~~~
src/pages/benefits.astro:625:44 - error ts(2339): Property 'dataset' does not exist on type 'never'.

625         const countryCode = lastMatchedTab.dataset.countryCode || '';
                                               ~~~~~~~
src/pages/benefits.astro:624:65 - error ts(2339): Property 'classList' does not exist on type 'never'.

624       if (matchCount === 1 && lastMatchedTab && !lastMatchedTab.classList.contains('active')) {
                                                                    ~~~~~~~~~
src/pages/benefits.astro:573:47 - error ts(2345): Argument of type 'boolean | null' is not assignable to parameter of type 'boolean | undefined'.
  Type 'null' is not assignable to type 'boolean | undefined'.

573         const tab = createCountryTab(country, isSuggested);
                                                  ~~~~~~~~~~~
src/pages/benefits.astro:512:29 - error ts(7006): Parameter 'countryCode' implicitly has an 'any' type.

512       const getFlagImage = (countryCode) => {
                                ~~~~~~~~~~~
src/pages/benefits.astro:484:17 - error ts(2339): Property 'dataset' does not exist on type 'Element'.

484         if (tab.dataset.countryCode === countryCode) {
                    ~~~~~~~
src/pages/benefits.astro:398:11 - warning ts(6133): 'benefitsContainer' is declared but its value is never read.

398     const benefitsContainer = document.getElementById('benefits-container');
              ~~~~~~~~~~~~~~~~~

src/pages/confirm.astro:7:11 - warning ts(6133): 'statusMessage' is declared but its value is never read.

7     const statusMessage = document.getElementById('status-message');
            ~~~~~~~~~~~~~

src/pages/index.astro:22:1 - warning ts(6133): 'ArrowRightIcon' is declared but its value is never read.

22 import ArrowRightIcon from '../assets/icons/arrow-right.svg';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/index.astro:21:1 - warning ts(6133): 'RobotIcon' is declared but its value is never read.

21 import RobotIcon from '../assets/icons/robot.svg';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/index.astro:20:1 - warning ts(6133): 'DigitalIcon' is declared but its value is never read.

20 import DigitalIcon from '../assets/icons/digital.svg';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/index.astro:19:1 - warning ts(6133): 'LanguageIcon' is declared but its value is never read.

19 import LanguageIcon from '../assets/icons/language.svg';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/index.astro:15:1 - warning ts(6133): 'InteractiveSection' is declared but its value is never read.

15 import InteractiveSection from '../components/InteractiveSection.astro';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/index.astro:14:1 - warning ts(6133): 'Testimonials' is declared but its value is never read.

14 import Testimonials from '../components/Testimonials.astro';
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/docs/all.astro:190:11 - error ts(2304): Cannot find name 'CardGrid'.

190         </CardGrid>
              ~~~~~~~~
src/pages/docs/all.astro:189:13 - error ts(2304): Cannot find name 'Card'.

189           </Card>
                ~~~~
src/pages/docs/all.astro:181:12 - error ts(2304): Cannot find name 'Card'.

181           <Card title="VI. Robotization" color="red" icon="🤖">
               ~~~~
src/pages/docs/all.astro:179:13 - error ts(2304): Cannot find name 'Card'.

179           </Card>
                ~~~~
src/pages/docs/all.astro:173:12 - error ts(2304): Cannot find name 'Card'.

173           <Card title="V. Financial Reforms" color="yellow" icon="💰">
               ~~~~
src/pages/docs/all.astro:171:13 - error ts(2304): Cannot find name 'Card'.

171           </Card>
                ~~~~
src/pages/docs/all.astro:163:12 - error ts(2304): Cannot find name 'Card'.

163           <Card title="IV. Logistical Integration" color="green" icon="🚚">
               ~~~~
src/pages/docs/all.astro:161:13 - error ts(2304): Cannot find name 'Card'.

161           </Card>
                ~~~~
src/pages/docs/all.astro:154:12 - error ts(2304): Cannot find name 'Card'.

154           <Card title="III. European Digital Public Services" color="teal" icon="🔬">
               ~~~~
src/pages/docs/all.astro:152:13 - error ts(2304): Cannot find name 'Card'.

152           </Card>
                ~~~~
src/pages/docs/all.astro:146:12 - error ts(2304): Cannot find name 'Card'.

146           <Card title="II. Digital Administration Integration" color="blue" icon="💻">
               ~~~~
src/pages/docs/all.astro:144:13 - error ts(2304): Cannot find name 'Card'.

144           </Card>
                ~~~~
src/pages/docs/all.astro:136:12 - error ts(2304): Cannot find name 'Card'.

136           <Card title="I. Language Unification" color="indigo" icon="🗣️">
               ~~~~
src/pages/docs/all.astro:135:10 - error ts(2304): Cannot find name 'CardGrid'.

135         <CardGrid columns={2} gap="2.5rem">
             ~~~~~~~~

src/pages/docs/for-you.astro:626:44 - error ts(2339): Property 'dataset' does not exist on type 'never'.

626         const countryName = lastMatchedTab.dataset.countryName || '';
                                               ~~~~~~~
src/pages/docs/for-you.astro:625:44 - error ts(2339): Property 'dataset' does not exist on type 'never'.

625         const countryCode = lastMatchedTab.dataset.countryCode || '';
                                               ~~~~~~~
src/pages/docs/for-you.astro:624:65 - error ts(2339): Property 'classList' does not exist on type 'never'.

624       if (matchCount === 1 && lastMatchedTab && !lastMatchedTab.classList.contains('active')) {
                                                                    ~~~~~~~~~
src/pages/docs/for-you.astro:573:47 - error ts(2345): Argument of type 'boolean | null' is not assignable to parameter of type 'boolean | undefined'.

573         const tab = createCountryTab(country, isSuggested);
                                                  ~~~~~~~~~~~
src/pages/docs/for-you.astro:512:29 - error ts(7006): Parameter 'countryCode' implicitly has an 'any' type.

512       const getFlagImage = (countryCode) => {
                                ~~~~~~~~~~~
src/pages/docs/for-you.astro:484:17 - error ts(2339): Property 'dataset' does not exist on type 'Element'.

484         if (tab.dataset.countryCode === countryCode) {
                    ~~~~~~~
src/pages/docs/for-you.astro:398:11 - warning ts(6133): 'benefitsContainer' is declared but its value is never read.

398     const benefitsContainer = document.getElementById('benefits-container');
              ~~~~~~~~~~~~~~~~~

src/pages/summaries/[...slug].astro:244:23 - error ts(2339): Property 'transcriptOnly' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'transcriptOnly' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

244           {entry.data.transcriptOnly
                          ~~~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:227:32 - error ts(7006): Parameter 'point' implicitly has an 'any' type.

227                 {keyPoints.map(point => (
                                   ~~~~~
src/pages/summaries/[...slug].astro:212:29 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

212                  entry.data.sourceType === 'podcast' ? 'Listen to original podcast' :
                                ~~~~~~~~~~
src/pages/summaries/[...slug].astro:211:29 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

211                  entry.data.sourceType === 'article' ? 'Read original article' :
                                ~~~~~~~~~~
src/pages/summaries/[...slug].astro:210:29 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

210                 {entry.data.sourceType === 'youtube' ? 'Watch on YouTube' :
                                ~~~~~~~~~~
src/pages/summaries/[...slug].astro:205:34 - error ts(2339): Property 'sourceUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

205                 href={entry.data.sourceUrl}
                                     ~~~~~~~~~
src/pages/summaries/[...slug].astro:195:34 - error ts(2339): Property 'sourceAuthor' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceAuthor' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

195                       entry.data.sourceAuthor
                                     ~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:193:37 - error ts(2339): Property 'sourceAuthor' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceAuthor' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

193                         {entry.data.sourceAuthor}
                                        ~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:192:43 - error ts(2339): Property 'sourceAuthorUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceAuthorUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

192                       <a href={entry.data.sourceAuthorUrl} target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300">
                                              ~~~~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:191:36 - error ts(2339): Property 'sourceAuthorUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceAuthorUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

191                     by {entry.data.sourceAuthorUrl ?
                                       ~~~~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:189:29 - error ts(2339): Property 'sourceAuthor' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceAuthor' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

189                 {entry.data.sourceAuthor &&
                                ~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:188:29 - error ts(2339): Property 'sourceTitle' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceTitle' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

188                 {entry.data.sourceTitle || entry.data.title}
                                ~~~~~~~~~~~
src/pages/summaries/[...slug].astro:180:35 - error ts(2339): Property 'sourceTitle' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceTitle' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

180                   alt={entry.data.sourceTitle || entry.data.title}
                                      ~~~~~~~~~~~
src/pages/summaries/[...slug].astro:179:35 - error ts(2339): Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

179                   src={entry.data.coverImage}
                                      ~~~~~~~~~~
src/pages/summaries/[...slug].astro:176:25 - error ts(2339): Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

176             {entry.data.coverImage &&
                            ~~~~~~~~~~
src/pages/summaries/[...slug].astro:170:35 - error ts(2339): Property 'sourceTitle' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceTitle' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

170                   alt={entry.data.sourceTitle || entry.data.title}
                                      ~~~~~~~~~~~
src/pages/summaries/[...slug].astro:166:78 - error ts(2339): Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

166             {entry.data.sourceType === 'youtube' && youtubeId && !entry.data.coverImage &&
                                                                                 ~~~~~~~~~~
src/pages/summaries/[...slug].astro:166:25 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

166             {entry.data.sourceType === 'youtube' && youtubeId && !entry.data.coverImage &&
                            ~~~~~~~~~~
src/pages/summaries/[...slug].astro:138:60 - error ts(2339): Property 'youtubeEmbed' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'youtubeEmbed' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

138         {entry.data.sourceType === 'youtube' && entry.data.youtubeEmbed && youtubeId &&
                                                               ~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:138:21 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

138         {entry.data.sourceType === 'youtube' && entry.data.youtubeEmbed && youtubeId &&
                        ~~~~~~~~~~
src/pages/summaries/[...slug].astro:112:25 - error ts(2339): Property 'duration' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'duration' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

112             {entry.data.duration}
                            ~~~~~~~~
src/pages/summaries/[...slug].astro:107:21 - error ts(2339): Property 'duration' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'duration' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

107         {entry.data.duration &&
                        ~~~~~~~~
src/pages/summaries/[...slug].astro:103:25 - error ts(2339): Property 'language' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'language' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

103             {entry.data.language}
                            ~~~~~~~~
src/pages/summaries/[...slug].astro:101:21 - error ts(2339): Property 'language' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'language' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

101         {entry.data.language &&
                        ~~~~~~~~
src/pages/summaries/[...slug].astro:98:103 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

98           <span class="flex items-center">{entry.data.sourceType.charAt(0).toUpperCase() + entry.data.sourceType.slice(1)}</span>
                                                                                                         ~~~~~~~~~~
src/pages/summaries/[...slug].astro:98:55 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

98           <span class="flex items-center">{entry.data.sourceType.charAt(0).toUpperCase() + entry.data.sourceType.slice(1)}</span>
                                                         ~~~~~~~~~~
src/pages/summaries/[...slug].astro:92:25 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

92             {entry.data.sourceType === 'podcast' &&
                           ~~~~~~~~~~
src/pages/summaries/[...slug].astro:87:25 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

87             {entry.data.sourceType === 'article' &&
                           ~~~~~~~~~~
src/pages/summaries/[...slug].astro:82:25 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

82             {entry.data.sourceType === 'youtube' &&
                           ~~~~~~~~~~
src/pages/summaries/[...slug].astro:78:22 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

78           entry.data.sourceType === 'podcast' ? 'bg-purple-900/30 text-purple-400 border border-purple-700/30' :
                        ~~~~~~~~~~
src/pages/summaries/[...slug].astro:77:22 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

77           entry.data.sourceType === 'article' ? 'bg-blue-900/30 text-blue-400 border border-blue-700/30' :
                        ~~~~~~~~~~
src/pages/summaries/[...slug].astro:76:22 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

76           entry.data.sourceType === 'youtube' ? 'bg-red-900/30 text-red-400 border border-red-700/30' :
                        ~~~~~~~~~~
src/pages/summaries/[...slug].astro:58:30 - error ts(2339): Property 'keyPoints' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'keyPoints' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

58 const keyPoints = entry.data.keyPoints || [];
                                ~~~~~~~~~
src/pages/summaries/[...slug].astro:54:18 - error ts(2339): Property 'sourceUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

54     ? entry.data.sourceUrl.split('v=')[1]?.split('&')[0]
                    ~~~~~~~~~
src/pages/summaries/[...slug].astro:53:54 - error ts(2339): Property 'sourceUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceUrl' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

53   (entry.data.sourceType === 'youtube' && entry.data.sourceUrl?.includes('youtube.com/watch?v=')
                                                        ~~~~~~~~~
src/pages/summaries/[...slug].astro:53:15 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

53   (entry.data.sourceType === 'youtube' && entry.data.sourceUrl?.includes('youtube.com/watch?v=')
                 ~~~~~~~~~~
src/pages/summaries/[...slug].astro:52:30 - error ts(2339): Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

52 const youtubeId = entry.data.sourceId ||
                                ~~~~~~~~
src/pages/summaries/[...slug].astro:37:56 - error ts(2339): Property 'generationDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'generationDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

37 const dateToUse = entry.data.publishDate || entry.data.generationDate;
                                                          ~~~~~~~~~~~~~~
src/pages/summaries/[...slug].astro:37:30 - error ts(2339): Property 'publishDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'publishDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

37 const dateToUse = entry.data.publishDate || entry.data.generationDate;
                                ~~~~~~~~~~~
src/pages/summaries/[...slug].astro:31:38 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

31     formattedSourceDate = entry.data.sourceDate;
                                        ~~~~~~~~~~
src/pages/summaries/[...slug].astro:24:38 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

24     const date = new Date(entry.data.sourceDate);
                                        ~~~~~~~~~~
src/pages/summaries/[...slug].astro:22:16 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

22 if (entry.data.sourceDate) {
                  ~~~~~~~~~~
src/pages/summaries/[...slug].astro:7:46 - error ts(2769): No overload matches this call.
  Overload 1 of 2, '(collection: keyof ContentEntryMap, filter?: ((entry: { id: string; slug: string; body: string; collection: "ideas"; data: { title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }; render(): Promise<...>; } | ... 42 more ... | ({ ...; } & { ...; })) => entry is { ...; } | ... 42 more ... | ({ ...; } & { ...; })) | undefined): Promise<...>', gave the following error.
  Overload 2 of 2, '(collection: keyof ContentEntryMap, filter?: ((entry: { id: string; slug: string; body: string; collection: "ideas"; data: { title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }; render(): Promise<...>; } | ... 42 more ... | ({ ...; } & { ...; })) => unknown) | undefined): Promise<...>', gave the following error.

7   const summaryEntries = await getCollection('summaries', ({ data }) => {
                                               ~~~~~~~~~~~
src/pages/summaries/[...slug].astro:144:15 - warning ts(6385): 'frameborder' is deprecated.

144               frameborder="0"
                  ~~~~~~~~~~~
src/pages/summaries/[...slug].astro:2:25 - warning ts(6133): 'getEntry' is declared but its value is never read.

2 import { getCollection, getEntry } from 'astro:content';
                          ~~~~~~~~

src/pages/summaries/index.astro:160:48 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

160                       {formatDate(summary.data.sourceDate)}
                                                   ~~~~~~~~~~
src/pages/summaries/index.astro:158:33 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

158                   {summary.data.sourceDate && (
                                    ~~~~~~~~~~
src/pages/summaries/index.astro:148:98 - error ts(2339): Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

148                       src={summary.data.coverImage || `https://img.youtube.com/vi/${summary.data.sourceId}/maxresdefault.jpg`}
                                                                                                     ~~~~~~~~
src/pages/summaries/index.astro:148:41 - error ts(2339): Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

148                       src={summary.data.coverImage || `https://img.youtube.com/vi/${summary.data.sourceId}/maxresdefault.jpg`}
                                            ~~~~~~~~~~
src/pages/summaries/index.astro:145:100 - error ts(2339): Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

145                 {summary.data.coverImage || (summary.data.sourceType === 'youtube' && summary.data.sourceId) ? (
                                                                                                       ~~~~~~~~
src/pages/summaries/index.astro:145:59 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

145                 {summary.data.coverImage || (summary.data.sourceType === 'youtube' && summary.data.sourceId) ? (
                                                              ~~~~~~~~~~
src/pages/summaries/index.astro:145:31 - error ts(2339): Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

145                 {summary.data.coverImage || (summary.data.sourceType === 'youtube' && summary.data.sourceId) ? (
                                  ~~~~~~~~~~
src/pages/summaries/index.astro:89:48 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

89                       {formatDate(summary.data.sourceDate)}
                                                  ~~~~~~~~~~
src/pages/summaries/index.astro:87:33 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

87                   {summary.data.sourceDate && (
                                   ~~~~~~~~~~
src/pages/summaries/index.astro:84:87 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

84                     {summary.data.sourceType === 'youtube' ? 'YouTube' : summary.data.sourceType}
                                                                                         ~~~~~~~~~~
src/pages/summaries/index.astro:84:35 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

84                     {summary.data.sourceType === 'youtube' ? 'YouTube' : summary.data.sourceType}
                                     ~~~~~~~~~~
src/pages/summaries/index.astro:81:34 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

81                     summary.data.sourceType === 'podcast' ? 'bg-purple-900/20 text-purple-400' :
                                    ~~~~~~~~~~
src/pages/summaries/index.astro:80:34 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

80                     summary.data.sourceType === 'article' ? 'bg-blue-900/20 text-blue-400' :
                                    ~~~~~~~~~~
src/pages/summaries/index.astro:79:34 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

79                     summary.data.sourceType === 'youtube' ? 'bg-red-900/20 text-red-400' :
                                    ~~~~~~~~~~
src/pages/summaries/index.astro:67:96 - error ts(2339): Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

67                     src={summary.data.coverImage || `https://img.youtube.com/vi/${summary.data.sourceId}/maxresdefault.jpg`}
                                                                                                  ~~~~~~~~
src/pages/summaries/index.astro:67:39 - error ts(2339): Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

67                     src={summary.data.coverImage || `https://img.youtube.com/vi/${summary.data.sourceId}/maxresdefault.jpg`}
                                         ~~~~~~~~~~
src/pages/summaries/index.astro:64:98 - error ts(2339): Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceId' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

64               {summary.data.coverImage || (summary.data.sourceType === 'youtube' && summary.data.sourceId) ? (
                                                                                                    ~~~~~~~~
src/pages/summaries/index.astro:64:57 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

64               {summary.data.coverImage || (summary.data.sourceType === 'youtube' && summary.data.sourceId) ? (
                                                           ~~~~~~~~~~
src/pages/summaries/index.astro:64:29 - error ts(2339): Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'coverImage' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

64               {summary.data.coverImage || (summary.data.sourceType === 'youtube' && summary.data.sourceId) ? (
                               ~~~~~~~~~~
src/pages/summaries/index.astro:21:29 - error ts(2339): Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceType' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

21   const type = summary.data.sourceType;
                               ~~~~~~~~~~
src/pages/summaries/index.astro:15:53 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

15   const dateB = b.data.sourceDate ? new Date(b.data.sourceDate) : new Date(0);
                                                       ~~~~~~~~~~
src/pages/summaries/index.astro:15:24 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

15   const dateB = b.data.sourceDate ? new Date(b.data.sourceDate) : new Date(0);
                          ~~~~~~~~~~
src/pages/summaries/index.astro:14:53 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

14   const dateA = a.data.sourceDate ? new Date(a.data.sourceDate) : new Date(0);
                                                       ~~~~~~~~~~
src/pages/summaries/index.astro:14:24 - error ts(2339): Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; } | { title: string; description: string; draft: boolean; ... 13 more ...; keyPoints?: string[] | undefined; }'.
  Property 'sourceDate' does not exist on type '{ title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }'.

14   const dateA = a.data.sourceDate ? new Date(a.data.sourceDate) : new Date(0);
                          ~~~~~~~~~~
src/pages/summaries/index.astro:7:42 - error ts(2769): No overload matches this call.
  Overload 1 of 2, '(collection: keyof ContentEntryMap, filter?: ((entry: { id: string; slug: string; body: string; collection: "ideas"; data: { title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }; render(): Promise<...>; } | ... 42 more ... | ({ ...; } & { ...; })) => entry is { ...; } | ... 42 more ... | ({ ...; } & { ...; })) | undefined): Promise<...>', gave the following error.
  Overload 2 of 2, '(collection: keyof ContentEntryMap, filter?: ((entry: { id: string; slug: string; body: string; collection: "ideas"; data: { title: string; description: string; draft: boolean; tags?: string | undefined; author?: string | undefined; customSlug?: string | undefined; }; render(): Promise<...>; } | ... 42 more ... | ({ ...; } & { ...; })) => unknown) | undefined): Promise<...>', gave the following error.

7 const allSummaries = await getCollection('summaries', ({ data }) => {
                                           ~~~~~~~~~~~
src/pages/summaries/index.astro:4:1 - warning ts(6133): 'DisplayTitle' is declared but its value is never read.

4 import DisplayTitle from '../../components/DisplayTitle.astro';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/transcripts/[...slug].astro:122:15 - warning ts(6385): 'frameborder' is deprecated.

122               frameborder="0"
                  ~~~~~~~~~~~
src/pages/transcripts/[...slug].astro:2:25 - warning ts(6133): 'getEntry' is declared but its value is never read.

2 import { getCollection, getEntry } from 'astro:content';
                          ~~~~~~~~

src/pages/ui/index.astro:543:11 - error ts(2322): Type 'string' is not assignable to type 'Image'.

543           image="/images/hero-image.jpg"
              ~~~~~
src/pages/ui/index.astro:844:11 - warning ts(6133): 'isProduction' is declared but its value is never read.

844     const isProduction = window.location.hostname !== 'localhost' &&
              ~~~~~~~~~~~~

src/pages/vision/digital-integration.astro:4:1 - warning ts(6133): 'CardGrid' is declared but its value is never read.

4 import CardGrid from '../../components/CardGrid.astro';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/vision/digital-integration.astro:3:1 - warning ts(6133): 'Card' is declared but its value is never read.

3 import Card from '../../components/Card.astro';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/vision/index.astro:4:1 - warning ts(6133): 'CardGrid' is declared but its value is never read.

4 import CardGrid from '../../components/CardGrid.astro';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/pages/vision/robotic-reindustrialization.astro:4:1 - warning ts(6133): 'CardGrid' is declared but its value is never read.

4 import CardGrid from '../../components/CardGrid.astro';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/pages/vision/robotic-reindustrialization.astro:3:1 - warning ts(6133): 'Card' is declared but its value is never read.

3 import Card from '../../components/Card.astro';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Result (73 files): 
- 116 errors
- 0 warnings
- 33 hints

Error: Process completed with exit code 1.
