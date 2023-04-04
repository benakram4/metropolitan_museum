import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';


export default function MainNav() {

    const [isExpanded, setIsExpanded] = useState(false);

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter();

    const searchSubmit = (e) => {
        e.preventDefault();
        const searchField = e.target.search.value;
        if (searchField !=="") {
            e.target.search.value = "";
            setSearchHistory(current => [...current, `title=true&q=${searchField}`]);

            router.push(`/artwork?title=true&q=${searchField}`);

            setIsExpanded(false);
        }
        else{
            document.querySelector('.search-field').classList.add('disabled');
        }
    }

    const onToggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const onNavLinkClick = () => {
        setIsExpanded(false);
    }

    return (
        <>
            <Navbar expanded={isExpanded} expand="lg" className='navbar-custom navbar-dark fixed-top' >
                <Container className='fluid navbar-container'>
                    <Navbar.Brand>Ben Akram</Navbar.Brand>
                    <Navbar.Toggle onClick={onToggleExpand}  aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav 
                            className="me-auto my-2 my-lg-1"
                            navbarScroll
                        >
                            <Link href="/" legacyBehavior passHref><Nav.Link active={router.pathname === "/"} onClick={onNavLinkClick} >Home</Nav.Link></Link>
                            <Link href="/search" legacyBehavior passHref><Nav.Link active={router.pathname === "/search"} onClick={onNavLinkClick} >Advanced Search</Nav.Link></Link>
                        </Nav>
                        &nbsp;<Form className="d-flex" onSubmit={searchSubmit}>
                            <Form.Control
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="me-2 search-field"
                                aria-label="Search"
                            />
                            <Button type="submit" id="btn">Search</Button>
                        </Form>&nbsp;
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                                <>
                                    <Link href="/favourites" legacyBehavior passHref><NavDropdown.Item active={router.pathname === "/favourites"} onClick={onNavLinkClick}>Favourite</NavDropdown.Item></Link>
                                    <Link href="/history" legacyBehavior passHref><NavDropdown.Item active={router.pathname === "/history"} onClick={onNavLinkClick} >Search History</NavDropdown.Item></Link>
                                </>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br /><br />
        </>
    )
}