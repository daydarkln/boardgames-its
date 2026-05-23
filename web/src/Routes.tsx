// In this file, all Page components from 'src/pages` are auto-imported.

import { PrivateSet, Router, Route, Set } from '@redwoodjs/router'

import AccountLayout from 'src/layouts/AccountLayout'
import AdminLayout from 'src/layouts/AdminLayout'
import PublicLayout from 'src/layouts/PublicLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="login" roles="admin">
        <Set wrap={ScaffoldLayout} title="Users" titleTo="adminUsers" buttonLabel="New User" buttonTo="adminNewUser">
          <Route path="/admin/users/new" page={AdminUserNewUserPage} name="adminNewUser" />
          <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="adminEditUser" />
          <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="adminUser" />
          <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />
        </Set>
        <Set wrap={ScaffoldLayout} title="PlayerPosts" titleTo="adminPlayerPosts" buttonLabel="New PlayerPost" buttonTo="adminNewPlayerPost">
          <Route path="/admin/player-posts/new" page={AdminPlayerPostNewPlayerPostPage} name="adminNewPlayerPost" />
          <Route path="/admin/player-posts/{id:Int}/edit" page={AdminPlayerPostEditPlayerPostPage} name="adminEditPlayerPost" />
          <Route path="/admin/player-posts/{id:Int}" page={AdminPlayerPostPlayerPostPage} name="adminPlayerPost" />
          <Route path="/admin/player-posts" page={AdminPlayerPostPlayerPostsPage} name="adminPlayerPosts" />
        </Set>
        <Set wrap={ScaffoldLayout} title="GameSessions" titleTo="adminGameSessions" buttonLabel="New GameSession" buttonTo="adminNewGameSession">
          <Route path="/admin/game-sessions/new" page={AdminGameSessionNewGameSessionPage} name="adminNewGameSession" />
          <Route path="/admin/game-sessions/{id:Int}/edit" page={AdminGameSessionEditGameSessionPage} name="adminEditGameSession" />
          <Route path="/admin/game-sessions/{id:Int}" page={AdminGameSessionGameSessionPage} name="adminGameSession" />
          <Route path="/admin/game-sessions" page={AdminGameSessionGameSessionsPage} name="adminGameSessions" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Venues" titleTo="adminVenues" buttonLabel="New Venue" buttonTo="adminNewVenue">
          <Route path="/admin/venues/new" page={AdminVenueNewVenuePage} name="adminNewVenue" />
          <Route path="/admin/venues/{id:Int}/edit" page={AdminVenueEditVenuePage} name="adminEditVenue" />
          <Route path="/admin/venues/{id:Int}" page={AdminVenueVenuePage} name="adminVenue" />
          <Route path="/admin/venues" page={AdminVenueVenuesPage} name="adminVenues" />
        </Set>
        <Set wrap={AdminLayout}>
          <Route path="/admin" page={AdminPage} name="admin" />
        </Set>
      </PrivateSet>

      <PrivateSet wrap={AccountLayout} unauthenticated="login">
        <Route path="/account/profile" page={AccountProfilePage} name="accountProfile" />
        <Route path="/account/create-game" page={AccountCreateGamePage} name="accountCreateGame" />
        <Route path="/account/my-registrations" page={AccountMyRegistrationsPage} name="accountMyRegistrations" />
        <Route path="/account/my-games" page={AccountMyGamesPage} name="accountMyGames" />
        <Route path="/account" page={AccountPage} name="account" />
      </PrivateSet>

      <Set wrap={PublicLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/players" page={PlayersPage} name="players" />
        <Route path="/venues/{id:Int}" page={VenuePage} name="venue" />
        <Route path="/venues" page={VenuesPage} name="venues" />
        <Route path="/games/{id:Int}" page={GamePage} name="game" />
        <Route path="/games" page={GamesPage} name="games" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
