
import {createMap} from './createMap.js';
import {mainFormHandler} from './mainForm.js';
import {getOffers} from './get-offers.js';
import {createSimilarOffers} from './create-similar-offers.js';
import {deactivatePage} from './page-state-controller.js';

deactivatePage();
createMap();
mainFormHandler();
getOffers();
createSimilarOffers();
