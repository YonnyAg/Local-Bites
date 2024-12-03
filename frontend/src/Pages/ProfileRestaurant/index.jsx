import Layout  from "../../Components/Layout"
import RestaurantProfile from "../../Components/RestaurantProfile"
import logVisit from '../../Components/LogVisit';

function premises() {
    useEffect(() => {
        logVisit(); // Llama a logVisit al cargar la página
      }, []); // [] asegura que solo se ejecuta una vez
    return (
        <Layout>
            <RestaurantProfile />
        </Layout>
    )
}

export default premises