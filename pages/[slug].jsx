import Head from 'next/head';
import { useEffect } from 'react';
import { useState } from 'react';
import {
   PortableText,
   sanityClient,
   urlFor,
   usePreviewSubscription,
} from '../lib/sanity';

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
   _id, name, slug, mainimage,
   ingredient[]{
      unit, wholeNumber, fraction, ingredient->{name}
   },
   instructions,
   likes
}`;

const Slug = ({ data, preview }) => {
   const { data: recipe } = usePreviewSubscription(recipeQuery, {
      params: { slug: data?.slug.current },
      initialData: data,
      enabled: preview,
   });
   console.log(recipe);
   const [lieks, setLieks] = useState(false);

   const addLikes = async () => {
      const res = await fetch('/api/handleLikes', {
         method: 'POST',
         body: JSON.stringify({ _id: recipe._id }),
      }).catch(console.log);

      const data = await res.json();

      setLieks(data.likes);
   };

   return (
      <>
         <Head>
            <title>{recipe.name || 'Cargando...'}</title>
         </Head>
         <article>
            <h1>{recipe.name}</h1>
            <main>
               <img
                  src={urlFor(recipe.mainimage).url()}
                  alt=""
                  style={{ maxWidth: '300px' }}
               />
               <button onClick={addLikes}>likes</button>
               <div>likes: {+lieks}</div>
               <div>
                  <h3>Ingredients:</h3>
                  {recipe?.ingredient.map((item, id) => (
                     <ul key={id}>
                        <li>{item.ingredient.name}</li>
                        <li>{item.fraction}</li>
                        <li>{item.unit}</li>
                        <li>{item.wholeNumber}</li>
                     </ul>
                  ))}

                  <h3>Instruccions here</h3>
                  <PortableText blocks={recipe?.instructions} />
               </div>
            </main>
         </article>
      </>
   );
};
export const getStaticPaths = async () => {
   const paths = await sanityClient.fetch(
      `*[_type == "recipe" && defined(slug.current)]{
         "params": {
            "slug":slug.current
         }
      }`
   );
   console.log(paths);
   return {
      paths,
      fallback: false,
   };
};

export const getStaticProps = async ({ params }) => {
   const { slug } = params;
   const data = await sanityClient.fetch(recipeQuery, { slug });
   return {
      props: { data, preview: true },
   };
};

export default Slug;
