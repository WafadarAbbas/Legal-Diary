import React from 'react';
import { Link } from 'react-router-dom';
import DropdownLanguage from './dropdown/language.jsx';
import DropdownProfile from './dropdown/profile.jsx';
import DropdownMegaMenu from './dropdown/mega.jsx';
import logo from '../../assets/LegalDiaryLogo.png'

import { AppSettings } from './../../config/app-settings.js';
import Items from './navItems/items.jsx';

function Header() {
	return (
		<AppSettings.Consumer>
			{({ toggleAppSidebarMobile, toggleAppSidebarEnd, toggleAppSidebarEndMobile, toggleAppTopMenuMobile, appHeaderLanguageBar, appHeaderMegaMenu, appHeaderInverse, appSidebarTwo, appTopMenu, appSidebarNone }) => (
		 	<div id="header" className="app-header" data-bs-theme={appHeaderInverse ? 'dark' : ''}>
					<div className="navbar-header  py-1" >
						{appSidebarTwo && (
							<button type="button" className="navbar-mobile-toggler" onClick={toggleAppSidebarEndMobile}>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						)}

						<Link to="/" className="navbar-brand " style={{ color: 'black', fontSize: '18px', fontWeight: 500, textDecoration: 'none' }} >
							<img
								src={logo}
								alt="Legal Dairy Logo"
								style={{ width: '40px', height: '70px', borderRadius: '40px', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)', marginRight: '3px' }}
							/>
							Legal Diaries
						</Link>




						{appHeaderMegaMenu && (
							<button type="button" className="navbar-mobile-toggler" data-bs-toggle="collapse" data-bs-target="#top-navbar">
								<span className="fa-stack fa-lg text-inverse">
									<i className="far fa-square fa-stack-2x">.</i>
									<i className="fa fa-cog fa-stack-1x"></i>
								</span>
							</button>
						)}
						{appTopMenu && !appSidebarNone && (
							<button type="button" className="navbar-mobile-toggler" onClick={toggleAppTopMenuMobile}>
								<span className="fa-stack fa-lg text-inverse">
									<i className="far fa-square fa-stack-2x"></i>
									<i className="fa fa-cog fa-stack-1x"></i>
								</span>
							</button>
						)}
						{appSidebarNone && appTopMenu && (
							<button type="button" className="navbar-mobile-toggler" onClick={toggleAppTopMenuMobile}>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						)}
						{!appSidebarNone && (
							<button type="button" className="navbar-mobile-toggler" onClick={toggleAppSidebarMobile}>
								<span className="icon-bar"> </span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						)}
					</div>
					

					{appHeaderMegaMenu && (
						<DropdownMegaMenu />
					)}

					<div className="navbar-nav d-flex justify-content-between">
					 
					<div className="d-none d-md-flex align-items-center"> 
							<Items />
						</div>
 
						<div className="d-flex align-items-center d-none d-md-block ">

						 
 
							<DropdownProfile />

							{appSidebarTwo && (
								<div className="navbar-divider d-none d-md-block"></div>
							)}

							{appSidebarTwo && (
								<div className="navbar-item d-none d-md-block">
									<Link to="/" onClick={toggleAppSidebarEnd} className="navbar-link icon">
										<i className="fa fa-th"></i>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
				
			 
			)}
		</AppSettings.Consumer>
	)
}

export default Header;
