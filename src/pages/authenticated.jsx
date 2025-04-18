import { Outlet } from 'react-router-dom';
//           ^ hook to get paramaters from the url
import { useNavigation, useLoaderData } from 'react-router';


const Authenticated = () => {
    const { me } = useLoaderData();
    //const navigation = useNavigation();
    //const isNavigating = Boolean(navigation.location);
    return (<section>
        {/* {isNavigating && <GlobalSpinner /> */}        

        <Outlet context={me} />
        {/* ^ this is where the children routes are gonna be rendered */}
        {/* Maybe we want to have footer or something that sticks through all childrens */}
    </section>)
}

export default Authenticated;