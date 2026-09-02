import './App.css'

function App() {
  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="logo">
          Expense<span>Mate</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>

          <button className="login-btn">
            Login
          </button>

          <button className="signup-btn">
            Get Started
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <p className="hero-label">
            PERSONAL FINANCE, SIMPLIFIED
          </p>

          <h1>
            Know where your
            <br />
            <span>money goes.</span>
          </h1>

          <p className="hero-description">
            ExpenseMate helps you track your spending, manage your
            monthly budget, and build better financial habits with
            clarity and confidence.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Get Started
              <span>→</span>
            </button>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>

          </div>

          <div className="hero-note">
            <span className="note-line"></span>
            Built for smarter everyday spending
          </div>

        </div>


        {/* Dashboard Preview */}
        <div className="dashboard-wrapper">

          <div className="dashboard-card">

            <div className="dashboard-heading">

              <div>
                <p>Total Balance</p>
                <h2>₹24,580</h2>
              </div>

              <div className="balance-badge">
                +12.4%
              </div>

            </div>


            <div className="dashboard-divider"></div>


            <div className="dashboard-stats">

              <div className="stat">
                <p>Monthly Budget</p>
                <strong>₹30,000</strong>
              </div>

              <div className="stat">
                <p>Total Spent</p>
                <strong>₹12,450</strong>
              </div>

            </div>


            <div className="budget-section">

              <div className="budget-label">
                <span>Monthly budget</span>
                <span>41.5%</span>
              </div>

              <div className="budget-bar">
                <div className="budget-progress"></div>
              </div>

              <p className="budget-left">
                ₹17,550 remaining
              </p>

            </div>


            <div className="recent-heading">
              Recent expenses
              <span>View all</span>
            </div>


            <div className="expense-list">

              <div className="expense-item">

                <div className="expense-left">

                  <div className="expense-icon">
                    FD
                  </div>

                  <div>
                    <strong>Food & Dining</strong>
                    <p>Today, 12:45 PM</p>
                  </div>

                </div>

                <strong className="expense-amount">
                  − ₹3,250
                </strong>

              </div>


              <div className="expense-item">

                <div className="expense-left">

                  <div className="expense-icon">
                    TR
                  </div>

                  <div>
                    <strong>Transport</strong>
                    <p>Yesterday, 8:20 AM</p>
                  </div>

                </div>

                <strong className="expense-amount">
                  − ₹1,800
                </strong>

              </div>


              <div className="expense-item">

                <div className="expense-left">

                  <div className="expense-icon">
                    SH
                  </div>

                  <div>
                    <strong>Shopping</strong>
                    <p>2 days ago</p>
                  </div>

                </div>

                <strong className="expense-amount">
                  − ₹2,400
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="features-section" id="features">

        <div className="section-heading">

          <p>CORE FEATURES</p>

          <h2>
            Everything you need to
            <br />
            manage your money.
          </h2>

          <span>
            A simple financial workspace designed to give you
            complete visibility over your everyday spending.
          </span>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-number">
              01
            </div>

            <h3>
              Track Expenses
            </h3>

            <p>
              Record and organize daily transactions by category,
              date, and payment method.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              02
            </div>

            <h3>
              Visualize Spending
            </h3>

            <p>
              Understand your financial habits through clear,
              meaningful spending analytics.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              03
            </div>

            <h3>
              Set Budgets
            </h3>

            <p>
              Create monthly spending limits and stay informed
              before your budget gets out of control.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-number">
              04
            </div>

            <h3>
              Smart Insights
            </h3>

            <p>
              Identify spending patterns and make more informed
              financial decisions.
            </p>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="how-section" id="how-it-works">

        <div className="section-heading">

          <p>HOW IT WORKS</p>

          <h2>
            A clearer way to manage
            <br />
            your finances.
          </h2>

        </div>


        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <div className="step-line"></div>

            <h3>
              Add Expenses
            </h3>

            <p>
              Record your everyday transactions in seconds.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <div className="step-line"></div>

            <h3>
              Set a Budget
            </h3>

            <p>
              Decide how much you want to spend each month.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <div className="step-line"></div>

            <h3>
              Monitor Spending
            </h3>

            <p>
              Keep track of your expenses as they happen.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              04
            </div>

            <div className="step-line"></div>

            <h3>
              Understand Your Habits
            </h3>

            <p>
              Use your spending insights to make better decisions.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div className="cta-content">

          <p>
            TAKE THE FIRST STEP
          </p>

          <h2>
            Your money deserves
            <br />
            your attention.
          </h2>

          <span>
            Start building better financial habits with ExpenseMate.
          </span>

          <button className="cta-btn">
            Start Managing Your Money
            <span>→</span>
          </button>

        </div>

      </section>


      {/* Footer */}
      <footer className="footer">

        <a href="#home" className="logo">
          Expense<span>Mate</span>
        </a>

        <p>
          © 2026 ExpenseMate. Personal finance made simple.
        </p>

        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>

      </footer>

    </div>
  )
}

export default App