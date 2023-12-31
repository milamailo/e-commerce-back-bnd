const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ 
      include: [
        { 
          model: Product, 
          through: { 
            model: ProductTag 
          }, 
          as: 'products' },
      ]
    });
    res.status(200).json(tags);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, 
          through: { 
            model: ProductTag 
          }, 
          as: 'products' },
      ]
    });

    if (!tag) {
      res.status(404).json({ message: `tag with id:${req.params.id} NOT exist` });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
      
    });
    res.status(200).json(tag);
  } 
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!tag) {
      return res.status(404).json({ message: `${req.body.tag_name} Not found!` });
    }
    res.status(200).json({ message: `tag name updated successfully to ${req.body.tag_name}` });
  } 
  catch (err) {
    res.status(500).json({ message: 'update Failed!' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tag) {
      res.status(404).json({ message: `tag with id:${req.params.id} NOT exist` });
      return;
    }
    res.status(200).json(tag);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
