import Layout  from "../../Components/Layout"
import Contact from "../../Components/FormContact"
import logVisit from '../../Components/LogVisit';

function contact() {
    useEffect(() => {
        logVisit(); // Llama a logVisit al cargar la página
      }, []); // [] asegura que solo se ejecuta una vez
    return (
        <Layout>
            <Contact />
        </Layout>
    )
}

export default contact