import Layout  from "../../Components/Layout"
import Profile from "../../Components/ProfileAccount"
import logVisit from '../../Components/LogVisit';

function profile() {
    useEffect(() => {
        logVisit(); // Llama a logVisit al cargar la página
      }, []); // [] asegura que solo se ejecuta una vez
    return (
        <Layout>
            <Profile />
        </Layout>
    )
}

export default profile