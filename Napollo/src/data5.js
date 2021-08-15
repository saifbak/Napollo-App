import React from 'react';
import Hip_Hop_Icon from './Components/Icons/GenreIcons/Hip-Hop';
import Reggae_Icon from './Components/Icons/GenreIcons/ReggaeIcon';
import Rock_Icon from './Components/Icons/GenreIcons/Rock_Icon';
import Gospel_Icon from './Components/Icons/GenreIcons/Gospel_Icon';
import Metal_Icon from './Components/Icons/GenreIcons/Metal_Icon';
import Pop_Icon from './Components/Icons/GenreIcons/Pop_Icon';
import R_B_Icon from './Components/Icons/GenreIcons/R&B_Icon';
import Classical_Icon from './Components/Icons/GenreIcons/Classical_Icon';
import Country_Icon from './Components/Icons/GenreIcons/Country_Icon';
import Exercise_Icon from './Components/Icons/GenreIcons/Exercise_Icon';
import Blues_Icon from './Components/Icons/GenreIcons/Blues_Icon';
import Old_School_Icon from "./Components/Icons/GenreIcons/80's_Icon";
import Jazz_Icon from './Components/Icons/GenreIcons/Jazz_Icon';
import Romantic_Icon from './Components/Icons/GenreIcons/Romantic_icon';
import Vocal_Icon from './Components/Icons/GenreIcons/Vocal_Icon';

export const genreList = [
  {
    genre: 'Hip-Hop',
    id: '1',
    songs: 25,
    color: '#333',
    icon: <Hip_Hop_Icon width={50} height={50} />,
  },
  {
    genre: 'R&B',
    id: '2',
    songs: 15,
    color: '#213',
    icon: <R_B_Icon width={50} height={50} />,
  },
  {
    genre: 'Blues',
    id: '3',
    songs: 5,
    color: '#456',
    icon: <Blues_Icon width={50} height={50} />,
  },
  {
    genre: 'Rock',
    id: '4',
    songs: 20,
    color: '#996',
    icon: <Rock_Icon width={50} height={50} />,
  },
  {
    genre: 'Reggae',
    id: '5',
    songs: 9,
    color: '#f68',
    icon: <Reggae_Icon width={50} height={50} />,
  },
  {
    genre: 'Romantic',
    id: '6',
    songs: 25,
    color: '#d21234',
    icon: <Romantic_Icon width={50} height={50} />,
  },
  {
    genre: 'Exercise',
    id: '7',
    songs: 7,
    color: '#111',
    icon: <Exercise_Icon width={50} height={50} />,
  },
  {
    genre: 'Country',
    id: '8',
    songs: 12,
    color: '#c78',
    icon: <Country_Icon width={50} height={50} />,
  },
  {
    genre: 'Metal',
    id: '9',
    songs: 15,
    color: '#e55',
    icon: <Metal_Icon width={50} height={50} />,
  },
  {
    genre: 'Jazz',
    id: '10',
    songs: 25,
    color: '#b98',
    icon: <Jazz_Icon width={50} height={50} />,
  },
  {
    genre: 'Classical',
    id: '11',
    songs: 22,
    color: '#345',
    icon: <Classical_Icon width={50} height={50} />,
  },
  {
    genre: 'Gospel',
    id: '12',
    songs: 11,
    color: '#311',
    icon: <Gospel_Icon width={50} height={50} />,
  },
  {
    genre: 'Pop',
    id: '13',
    songs: 11,
    color: '#311',
    icon: <Pop_Icon width={50} height={50} />,
  },
];

export const shortData = [
  {
    title: 'hate me',
    artist: 'Ellie Goulding',
    image: require('./assests/images/hate-me.jpg'),
    id: '4',
    numListening: 5000,
    name: 'Ellie Goulding',
    subtitle: 'hate me',
    artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
    state: 'CA',
    km: 400,
    type: 'Afro',
    likes: 0,
    time: '4:05',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    image: require('./assests/images/solo.jpg'),
    id: '5',
    numListening: 1234,
    name: 'Clean Bandit',
    subtitle: 'Solo',
    artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
    url: 'https://samplesongs.netlify.app/Solo.mp3',
    state: 'FA',
    km: 100,
    type: 'Hip-Hop',
    likes: 0,
    time: '3:21',
  },
  {
    title: 'without me',
    artist: 'Halsey',
    image: require('./assests/images/without-me.jpg'),
    id: '6',
    numListening: 4000,
    name: 'Halsey',
    subtitle: 'without me',
    artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
    url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
    state: 'MT',
    km: 233,
    type: 'Soul',
    likes: 0,
    time: '5:45',
  },
];
export const media = [
  {text: ' This is the dopest song ever streamed on this app', id: '1'},
  {text: ' This is the dopest song ever streamed on this app', id: '2'},
  {text: ' This is the dopest song ever streamed on this app', id: '3'},
  {text: ' This is the dopest song ever streamed on this app', id: '4'},
  {text: ' This is the dopest song ever streamed on this app', id: '5'},
];
export const supporters = [
  {name: ' Hike Abdul', id: '1', handle: '@hike'},
  {name: ' James Hayden', id: '2', handle: '@james'},
  {name: ' Larry King', id: '3', handle: '@larry'},
  {name: ' Lemmy Dame', id: '4', handle: '@lemmy'},
  {name: 'Martin Bones', id: '5', handle: '@martin'},
];
export const alphaBets = [
  {title: 'A', id: 1},
  {title: 'B', id: 2},
  {title: 'C', id: 3},
  {title: 'D', id: 4},
  {title: 'E', id: 5},
  {title: 'F', id: 6},
  {title: 'G', id: 7},
  {title: 'H', id: 8},
  {title: 'I', id: 9},
  {title: 'J', id: 10},
  {title: 'K', id: 11},
  {title: 'L', id: 12},
  {title: 'M', id: 13},
  {title: 'N', id: 14},
  {title: 'O', id: 15},
  {title: 'P', id: 16},
  {title: 'Q', id: 17},
  {title: 'R', id: 18},
  {title: 'S', id: 19},
  {title: 'T', id:20},
  {title: 'U', id: 21},
  {title: 'V', id: 22},
  {title: 'W', id:23},
  {title: 'X', id: 24},
  {title: 'Y', id: 25},
  {title: 'Z', id: 26},
];
