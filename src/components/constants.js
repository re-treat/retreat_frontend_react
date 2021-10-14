import IMG_LOVE from "../assets/images/emoji/love.png"
import IMG_FRUSTRATED from "../assets/images/emoji/frustrated.png"
import IMG_LMAO from "../assets/images/emoji/LMAO.png"
import IMG_STRESSED from "../assets/images/emoji/stressed.png"
import IMG_TOUCHED from "../assets/images/emoji/touched.png"
import IMG_VULNERABLE from "../assets/images/emoji/vulnerable.png"
import IMG_ROLLING_MY_EYES from "../assets/images/emoji/rolling my eyes.png"
import IMG_EXCITED from "../assets/images/emoji/excited.png"
import IMG_WORRIED from "../assets/images/emoji/worried.png"
import IMG_ANGRY from "../assets/images/emoji/angry.png"
import IMG_HAPPY from "../assets/images/emoji/happy.png"
import IMG_SAD from "../assets/images/emoji/sad.png"
import IMG_INFATUATED from "../assets/images/emoji/infatuated.png"
import IMG_PRAYING from "../assets/images/emoji/praying.png"
import IMG_LOST from "../assets/images/emoji/lost.png"
import IMG_ZENOUT from "../assets/images/emoji/zen out.png"

import AVA_ALLIGATOR from "../assets/images/avatar/alligator.png";
import AVA_ALPACA from "../assets/images/avatar/alpaca.png";
import AVA_ANTELOPE from "../assets/images/avatar/antelope.png";
import AVA_BEAVER from "../assets/images/avatar/beaver.png";
import AVA_BEE from "../assets/images/avatar/bee.png";
import AVA_BEETLE from "../assets/images/avatar/beetle.png";
import AVA_BIRD from "../assets/images/avatar/bird.png";
import AVA_CAMEL from "../assets/images/avatar/camel.png";
import AVA_CATERPILLAR from "../assets/images/avatar/caterpillar.png";
import AVA_CHINCHILLA from "../assets/images/avatar/chinchilla.png";
import AVA_CHIPMUNK from "../assets/images/avatar/chipmunk.png";
import AVA_COYOTE from "../assets/images/avatar/coyote.png";
import AVA_CRAB from "../assets/images/avatar/crab.png";
import AVA_DEER from "../assets/images/avatar/deer.png";
import AVA_DOG from "../assets/images/avatar/dog.png";
import AVA_DOLPHIN from "../assets/images/avatar/dolphin.png";
import AVA_EAGLE from "../assets/images/avatar/eagle.png";
import AVA_EEL from "../assets/images/avatar/eel.png";
import AVA_ELEPHANT from "../assets/images/avatar/elephant.png";
import AVA_FALCON from "../assets/images/avatar/falcon.png";
import AVA_FERRET from "../assets/images/avatar/ferret.png";
import AVA_FLAMINGO from "../assets/images/avatar/flamingo.png";
import AVA_GOAT from "../assets/images/avatar/goat.png";
import AVA_GOOSE from "../assets/images/avatar/goose.png";
import AVA_GORILLA from "../assets/images/avatar/gorilla.png";
import AVA_HAMSTER from "../assets/images/avatar/hamster.png";

const EMOJI_LST = [
    ["love",'',IMG_LOVE],
    ["frustrated", '', IMG_FRUSTRATED],
    ["LMAO", '', IMG_LMAO],
    ["stressed", '', IMG_STRESSED],
    ["touched", '', IMG_TOUCHED],
    ["vulnerable", '', IMG_VULNERABLE],
    ["rolling my eyes", '', IMG_ROLLING_MY_EYES],
    ["excited", '', IMG_EXCITED],
    ["worried", '', IMG_WORRIED],
    ["angry", '', IMG_ANGRY],
    ["happy", '', IMG_HAPPY],
    ["sad", '', IMG_SAD],
    ["infatuated", '', IMG_INFATUATED],
    ["praying", '', IMG_PRAYING],
    ["lost", '', IMG_LOST],
    ["zen out", '', IMG_ZENOUT],
];

const getEmojiByKey = (key)=>{
    let lst = EMOJI_LST.filter(e=>e[0]==key)
    return lst.length>0 ? lst[0][2]:null
}

const RESP_EMOJI = {
    'sad': '😞',
    'tears': '😆',
    'like': '🧡',
    'love': '🤗',
    'hate': '🥺'
}

const RANDOM_ANIMALS = ['Alligator',
'Alpaca',
'Antelope',
'Beaver',
'Bee',
'Beetle',
'Bird',
'Camel',
'Caterpillar',
'Chinchilla',
'Chipmunk',
'Coyote',
'Crab',
'Deer',
'Dog',
'Dolphin',
'Eagle',
'Eel',
'Elephant',
'Falcon',
'Ferret',
'Flamingo',
'Goat',
'Goose',
'Gorilla',
'Hamster']
const getRandName = ()=> RANDOM_ANIMALS[parseInt(Math.random() * (RANDOM_ANIMALS.length-1))]

const AVATAR_IMG = [
  AVA_ALLIGATOR,
  AVA_ALPACA,
  AVA_ANTELOPE,
  AVA_BEAVER,
  AVA_BEE,
  AVA_BEETLE,
  AVA_BIRD,
  AVA_CAMEL,
  AVA_CATERPILLAR,
  AVA_CHINCHILLA,
  AVA_CHIPMUNK,
  AVA_COYOTE,
  AVA_CRAB,
  AVA_DEER,
  AVA_DOG,
  AVA_DOLPHIN,
  AVA_EAGLE,
  AVA_EEL,
  AVA_ELEPHANT,
  AVA_FALCON,
  AVA_FERRET,
  AVA_FLAMINGO, 
  AVA_GOAT, 
  AVA_GOOSE, 
  AVA_GORILLA, 
  AVA_HAMSTER
];

export {EMOJI_LST,
    RESP_EMOJI,
    AVATAR_IMG,
    getEmojiByKey,
    getRandName}