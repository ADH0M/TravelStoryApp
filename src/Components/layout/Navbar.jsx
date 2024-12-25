/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/images/te767.jpg';
import ProfileInfo from '../Cards/ProfileInfo';
import { useEffect, useState } from 'react';



const userInfo = {
  'username':'adham',
  '_ID':12341222222,
  'useremail':'adhamsaed@gmail.com',
};


const Navbar = () => {
  const navigate = useNavigate();
  const onLoguot = ()=>{
    return navigate('/login')
  }

  const [scroller , setSecorll ] = useState(false);
  const [hiddenScroller , setHeddinScroller ] = useState(false);
  const [leatsScroll ,setleatsScroll] = useState(false);

  const handelScroll = ()=>{
    if(window.scrollY > 80  ){
      setSecorll(true);
      if(leatsScroll >window.screenY){
        setleatsScroll(true);
      }else{
        setleatsScroll(false);
      };
    }else{
      setSecorll(false);
    };
  };

  useEffect(()=>{
    window.addEventListener('scroll' ,handelScroll);
    return ()=>{
      window.removeEventListener('scroll' ,handelScroll);
    }
  } ,[]);

  
  return (
    <nav 
    className = {`scroll-nav ${scroller?'fixed bg-white':'absolute bg-transparent'} `}>
        <div 
          className=''
        >
            <img src={LOGO} alt="logo"  className=' h-12' />
        </div>
        <section className='relative'>
          <ul className={`flex flex-col  list-none gap-4 sm:flex-row sm:flex hidden bg-white p-2 sm:bg-transparent sm:p-0  `}>
            <li className='nav-btn' onClick={()=>navigate('/')}>home</li>
            <li className='nav-btn' onClick={()=>navigate('/bestimg')}> Appointments section</li>  
            {/* <li className='nav-btn' onClick={()=>navigate('/aboutus')}>about us</li> */}
            {/* <li className='nav-btn' onClick={()=>navigate('/contucts')}>contucts</li> */}
            <li className='nav-btn' onClick={()=>navigate('/kanbanPage')}>Your Map</li>
            <li className='nav-btn' onClick={()=>navigate('/favoriteImg')}>Favorite Image</li>

          </ul>
        </section>
        <ProfileInfo userInfo={userInfo} logout={onLoguot}/>
    </nav>
  )
};

export default Navbar;