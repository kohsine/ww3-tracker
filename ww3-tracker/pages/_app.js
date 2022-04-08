// import App from 'next/app'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink
} from "@apollo/client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const client = new ApolloClient({
    //   uri: 'http://localhost:80/api/graphql',
    link: createHttpLink({
        uri: '/api/graphql',
    }),
    cache: new InMemoryCache()
});

Sentry.init({
    dsn: "https://86a6d3fa5c994e3098d76c746c137a06@o1195904.ingest.sentry.io/6319026",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
