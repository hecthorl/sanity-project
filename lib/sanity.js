import {
   createClient,
   createPreviewSubscriptionHook,
   createImageUrlBuilder,
   createPortableTextComponent,
} from 'next-sanity';

const config = {
   projectId: '83pyy5p7',
   dataset: 'production',
   apiVersion: '2021-04-02',
   useCdn: false,
};

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = source => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
   ...config,
   serializers: {},
});
