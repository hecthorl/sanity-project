export default {
   name: 'ingredient',
   title: 'Ingredient',
   type: 'document',
   fields: [
      {
         name: 'name',
         title: 'Ingredient name',
         type: 'string',
      },
      {
         name: 'image',
         title: 'Ingredient image',
         type: 'image',
      },
      {
         name: 'notes',
         title: 'Notes',
         type: 'text',
      },
   ],
};
