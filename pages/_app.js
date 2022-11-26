import "../styles/globals.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
// <Component> is whatever page is the active route, so wrapping it with our overall layout will wrap every page.
export default MyApp;
