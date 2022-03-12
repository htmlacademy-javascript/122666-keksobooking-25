
import {getOffers} from './get-offers.js';
import {createSimilarOffers} from './create-similar-offers.js';
import {activatePage, deactivatePage} from './page-state-controller.js';
deactivatePage();
setTimeout(activatePage, 2000);
getOffers();
createSimilarOffers();
