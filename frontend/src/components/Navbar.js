import { Link } from 'react-router-dom'

const Navbar = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return(
       <header>
        <div className="container">
            <Link to='/' onClick={scrollToTop}>
                <h1>🏋️ FitTrack Pro</h1>
            </Link>
            <nav>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}>
                    <Link to='/' onClick={scrollToTop} style={{ textDecoration: 'none' }}>
                        <button className="navbar-btn">
                            <span className="navbar-btn-icon">💪</span>
                            My Workouts
                        </button>
                    </Link>
                </div>
            </nav>
        </div>
       </header>
    )

}

export default Navbar