//RESTfull APIs
import ScoreCard from '../models/ScoreCard'
import { Router } from 'express';

const router = Router();

//Done
router.post('/card', async (req, res) => {
  try {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    const existing = await ScoreCard.findOne({name, subject, })
    const newCard = new ScoreCard({name, subject, score});
    if(existing){
      const update = await ScoreCard.findOneAndUpdate({name, subject, }, ({score:`${score}`}));
      res.json({message:`Updating ( ${name}, ${subject}, ${score} )`});
    }else{
      res.json({message:`Adding ( ${name}, ${subject}, ${score})`})
      return newCard.save();
    }
  } catch (e) { throw new Error("Post error: " + e );}
})



router.get('/cards', async (req, res) => {
  try {
    if(req.query.type === 'name') {
      const name = req.query.queryString;
      const found = await ScoreCard.find({name:`${name}`})
      if(found.length === 0){
         res.json({message:`${req.query.type} ( ${name} ) not found !`})
      } else {
        const foundList = [];
        found.map(doc => foundList.push(`Found card with name: ( ${doc.name}, ${doc.subject}, ${doc.score} )`));
        res.json({messages:foundList})
      }
    } else {
      const subject = req.query.queryString;
      const found = await ScoreCard.find({subject:`${subject}`})
      if(found.length === 0){
         res.json({message:`${req.query.type} ( ${subject} ) not found !`})
      }else {
        const foundList = [];
        found.map(doc => foundList.push(`Found card with subject: ( ${doc.name}, ${doc.subject}, ${doc.score} )`));
        res.json({messages:foundList});
      }
    }
  } catch (e) { throw new Error("Post error: " + e );}
})


//Done
router.delete('/cards', async (_, res) => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    res.json({message: "Database cleared"})
  } catch (e) { throw new Error("Delete error: " + e);}
})

export default router;
