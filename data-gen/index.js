import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import randomWords from 'random-words'
import * as fs from 'fs';

const UNSPLASH_LIMIT = parseInt(process.env.UNSPLASH_LIMIT);
const NUMBER_OF_DATAPOINTS = parseInt(process.env.NUMBER_OF_DATAPOINTS);
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const MIN_LNG = parseFloat(process.env.MIN_LNG);
const MAX_LNG = parseFloat(process.env.MAX_LNG);
const MIN_LAT = parseFloat(process.env.MIN_LAT);
const MAX_LAT = parseFloat(process.env.MAX_LAT);

const unsplash = createApi({
  accessKey: UNSPLASH_KEY,
  fetch: nodeFetch,
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const reducer = (photo) => {
  return {
    title: randomWords({ min: 3, max: 10, join: ' ' }),
    description: randomWords({ min: 3, max: 50, join: ' ' }),
    lng: getRandomArbitrary(MIN_LNG, MAX_LNG),
    lat: getRandomArbitrary(MIN_LAT, MAX_LAT),
    author: randomWords({ min: 1, max: 1, join: ' '}),
    url: photo.urls.small_s3
  }
};

const lineReducer = (photo) => {
  return `('${photo.title}', '${photo.description}', ${photo.lng}, ${photo.lat}, '${photo.author}', '${photo.url}')`
}

const authorLineMapper = (author) => {
  return `('${author}', 'password')`
}

const repeatUnsplashCaller = async () => {
  let allData = [];
  for (let i = 0; i < NUMBER_OF_DATAPOINTS; i += UNSPLASH_LIMIT) {
    const data = await unsplash.photos.getRandom({ count: UNSPLASH_LIMIT });
    if (data.errors) {
      // handle error here
      console.log('error occurred: ', data.errors[0]);
    } else {
      // handle success here
      allData = allData.concat(data.response);
    }
  }

  return allData;
}

const data = await repeatUnsplashCaller();
const photos = data.map((photo) => reducer(photo));
const lines = photos.map((photo) => lineReducer(photo));
const authors = photos.map((photo) => photo.author);
const uniq_authors = [...new Set(authors)];
const uniq_authors_line = uniq_authors.map((author) => authorLineMapper(author));
try {
  try {
    fs.unlinkSync('./photos.txt');
    fs.unlinkSync('./authors.txt');
  } catch (err) {
    console.log("file delete error: " + err);
  }

  lines.forEach((element, i) => {
    fs.writeFileSync('./photos.txt', element + (i == lines.length - 1 ? ";\n" : ",\n"), { flag: 'a+' });
    //fs.writeFileSync('./photos.txt', element + ",\n", { flag: 'a+' });
  });

  uniq_authors_line.forEach((element, i) => {
    fs.writeFileSync('./authors.txt', element + (i == uniq_authors_line.length - 1 ? ";\n" : ",\n"), { flag: 'a+' });
  })

  //file written successfully
} catch (err) {
  console.error(err);
}

/*unsplash.photos.getRandom({ count: 500 }).then(data => {
  if (data.errors) {
    // handle error here
    console.log('error occurred: ', data.errors[0]);
  } else {
    // handle success here
    const photos = data.response.map((photo) => reducer(photo));
    const lines = photos.map((photo) => lineReducer(photo));
    const authors = photos.map((photo) => photo.author);
    const uniq_authors = [...new Set(authors)];
    const uniq_authors_line = uniq_authors.map((author) => authorLineMapper(author));
    try {
      try {
        fs.unlinkSync('./photos.txt');
        fs.unlinkSync('./authors.txt');
      } catch (err) {
      }

      lines.forEach((element, i) => {
        fs.writeFileSync('./photos.txt', element + (i == lines.length - 1 ? ";\n" : ",\n"), { flag: 'a+' });
      });

      uniq_authors_line.forEach((element, i) => {
        fs.writeFileSync('./authors.txt', element + (i == uniq_authors_line.length - 1 ? ";\n" : ",\n"), { flag: 'a+' });
      })

      //file written successfully
    } catch (err) {
      console.error(err);
    }
  }
});*/