import express from 'express';
import fetch from 'node-fetch';
import sendJSON from '../middleware/sendJSON.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Medicine Backend');
  res.end();
});

// MEDICINE SEARCH
router.get('/api/v1/search/:name', (req, res, next) => {
  const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${req.params.name}`;
  fetch(url)
    .then(data => data.json())
    .then(data => {
      let results = data.drugGroup.conceptGroup[1].conceptProperties;
      sendJSON(res, results);
    })
    .catch(err => console.error(err));
});

// ALTERNATIVE SEARCH
router.get('/api/v1/alternatives/:id', (req, res, next) => {
  const urlIN = `https://rxnav.nlm.nih.gov/REST/rxcui/${req.params.id}/related.json?tty=IN`;
  fetch(urlIN)
    .then(results => results.json())
    .then(data => {
      let rxcui = data.relatedGroup.conceptGroup[0].conceptProperties[0].rxcui;
      // const urlSBD = `https://rxnav.nlm.nih.gov/REST/rxcui/${inCode}/related.json?tty=SBD+SCD`;
      const urlSBD = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/related.json?tty=SBD`;
      fetch(urlSBD)
        .then(data => data.json())
        .then(data => {
          let results = data.relatedGroup.conceptGroup[0].conceptProperties;
          sendJSON(res, results);
        });
    })
    .catch(err => console.error(err));
});

export default router;
