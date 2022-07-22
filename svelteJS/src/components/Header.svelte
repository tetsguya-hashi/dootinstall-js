<script>
  import { Router, Link } from "svelte-routing";
</script>

<header>
  <nav>
    <Router>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="create">Create</Link>
    </Router>
  </nav>
</header>
