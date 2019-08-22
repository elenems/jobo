import React, {useState} from 'react'
import AuthButtons from './components/AuthButtons';
import {NavLink} from 'react-router-dom';
import { MdFilterList } from "react-icons/md";
import {connect} from 'react-redux';
import Modal from '../../../../components/Modal';

const compareIcon = <MdFilterList />;

function Navigation(props) {
    const [showModal, setShowModal] = useState(false);
    const confirm = () => {
        setShowModal(false);
    }
    const cancel = () => {
        setShowModal(false);
    }
    const redirectToCompareList = () => {
        if(!props.jobs.length){
            setShowModal(true)
        }else{
            props.history.push('/comparingList');
        }
    }

    return (
        <div className = 'navigation'>
            <Modal title='List is empty, add some jobs first.' show = {showModal} confirm={confirm} cancel = {cancel}/>
        <nav>
            <ul>
                <li style={{verticalAlign:'sub', position:'relative'}}>
                    <button style={{fontSize:'20px', marginRight:'4px'}} 
                    title='Comparing list'
                    onClick={redirectToCompareList} 
                    className='clear-button'>{compareIcon}</button>
                    <span className='absolute-position-number'>{props.jobs.length || ''}</span>
                </li>
                <li><NavLink exact activeClassName="selected-link" className='nav-link' to='/'>Home</NavLink></li>
                <li><NavLink activeClassName="selected-link" className='nav-link' to='/joblist'>Jobs</NavLink></li>
            </ul>
        </nav>
        <AuthButtons/>
        </div>
    )
}
const mapStateToProps = state => {
  return {
      jobs: state.jobs.jobs
  }
}
export default connect(mapStateToProps)(Navigation);
