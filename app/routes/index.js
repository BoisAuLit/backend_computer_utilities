const express = require('express');
const router = express.Router();


const {
  fetchingShortcuts
} = require('@controllers/shortcuts');

router.route('/shortcuts')
  .get(fetchingShortcuts);

module.exports = router;