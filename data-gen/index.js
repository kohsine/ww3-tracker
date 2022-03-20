import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import randomWords from 'random-words'
import * as fs from 'fs';

const unsplash = createApi({
  accessKey: '_hntH490mG9M30Bj-BSBaAUQ3UbxRjKK41I4-_rA0YM',
  fetch: nodeFetch,
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const reducer = (photo) => {
  return {
    title: randomWords({ min: 3, max: 10, join: ' ' }),
    description: photo.description || randomWords({ min: 3, max: 50, join: ' ' }),
    lng: photo.location.position.longitude || getRandomArbitrary(-180, 180),
    lat: photo.location.position.latitude || getRandomArbitrary(-90, 90),
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
    console.log(uniq_authors);
    console.log(photos);
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