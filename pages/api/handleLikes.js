import { sanityClient } from '../../lib/sanity';

sanityClient.config({
   token: process.env.SANITY_WRITE_TOKEN,
});

// const handleLikes = async

export default async function handleLikes(req, res) {
   const { _id } = JSON.parse(req.body);
   const data = await await sanityClient
      .patch(_id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit()
      .catch(console.log);
   res.status(200).json({ likes: data.likes });
}
