const Candidature = require('../models/Candidature');
const asyncHandler = require('express-async-handler')

const getAllCandidatures = asyncHandler(async (req, res) => {
  try {
    const candidatures = await Candidature.find();
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createCandidature = asyncHandler(async (req, res) => {
  try {
    const candidature = new Candidature(req.body);
    await candidature.save();
    res.status(201).json(candidature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateCandidature = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCandidature = await Candidature.updateOne({ _id: id }, req.body);
    res.json(updatedCandidature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteCandidature = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Candidature.deleteOne({ _id: id });
    res.json({ message: 'Candidature deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getCandidaturesById = async (req, res) => {
  try {
    const { id } = req.body;
    const candidatures = await Candidature.find({ _id: id });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

const getCandidaturesByStage = async (req, res) => {
  try {
    const { id } = req.params;
    const candidatures = await Candidature.find({ id_stage: id });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
const getCandidaturesByStagiaire = async (req, res) => {
  try {
    const { id_stagiaire } = req.params;
    const candidatures = await Candidature.find({
      id_utilisateur: id_stagiaire
    });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
const accepterDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await Candidature.findOneAndUpdate(
      { _id: id },
      { $set: { statut_candidature: "accepter" } },
      { new: true }
    );
    res.json(candidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refuserDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await Candidature.findOneAndUpdate(
      { _id: id },
      { $set: { statut_candidature: "refuser" } },
      { new: true }
    );
    res.json(candidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllCandidatures,
  createCandidature,
  updateCandidature,
  deleteCandidature,
  getCandidaturesById,
  getCandidaturesByStage,
  getCandidaturesByStagiaire,
  accepterDemande,
  refuserDemande
};
