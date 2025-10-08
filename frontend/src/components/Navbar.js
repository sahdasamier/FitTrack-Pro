import {Link} from 'react-router-dom'

const Navbar = () => {

    return(
       <header>
        <div className="container">
            <Link to='/'>
                <h1>🏋️ FitTrack Pro</h1>
            </Link>
            <nav>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    fontWeight: '500'
                }}>
                    <span style={{
                        padding: '0.5rem 1rem',
                        background: 'var(--primary-gradient)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                    }}>
                        My Workouts
                    </span>
                </div>
            </nav>
        </div>
       </header>
    )

}

export default Navbar