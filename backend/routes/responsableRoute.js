const express = require('express');
const router = express.Router();
const { deleteResponsable,createResponsable,addIdsStg,getResponsableByUserId,getResponsableById } = require('../controllers/responsableController');

router.post('/add', createResponsable);

router.get('/show/:id', getResponsableByUserId);
router.get('/getResponsableById/:id', getResponsableById);

// add ids for stagiaires
router.put('/addIdsStg/:id', addIdsStg);

// Define route for deleting a Responsable
router.delete('/delete/:id', deleteResponsable);

module.exports = router;
