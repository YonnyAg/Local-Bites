import Layout  from "../../Components/Layout"
import Carousel from '../../Components/Carousel';
import CarouselWithCategories from '../../Components/CarouselWithCategories';
import logVisit from '../../Components/LogVisit';

function home() {
    useEffect(() => {
        logVisit(); // Llama a logVisit al cargar la página
      }, []); // [] asegura que solo se ejecuta una vez
    return (
        <Layout>
            <Carousel />
            <CarouselWithCategories />
        </Layout>
    )
}

export default home