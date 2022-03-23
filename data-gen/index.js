import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import randomWords from 'random-words'
import * as fs from 'fs';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_KEY,
  fetch: nodeFetch,
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const reducer = (photo) => {
  return {
    title: randomWords({ min: 3, max: 10, join: ' ' }),
    description: photo.description || randomWords({ min: 3, max: 50, join: ' ' }),
    lng: getRandomArbitrary(parseFloat(process.env.MIN_LNG), parseFloat(process.env.MAX_LNG)),
    lat: getRandomArbitrary(parseFloat(process.env.MIN_LAT), parseFloat(process.env.MAX_LAT)),
    author: photo.user.username || randomWords({ min: 1, max: 1, join: ' '}),
    url: photo.urls.small_s3
  }
};

const lineReducer = (photo) => {
  return `('${photo.title}', '${photo.description}', ${photo.lng}, ${photo.lat}, '${photo.author}', '${photo.url}')`
}

const authorLineMapper = (author) => {
  return `('${author}', 'password')`
}

unsplash.photos.getRandom({ count: 500 }).then(result => {
  if (result.errors) {
    // handle error here
    console.log('error occurred: ', result.errors[0]);
  } else {
    // handle success here
    const photos = result.response.map((photo) => reducer(photo));
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
});