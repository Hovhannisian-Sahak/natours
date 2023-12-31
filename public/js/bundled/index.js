const t = () => {
    let e = document.querySelector('.alert');
    e && e.parentElement.removeChild(e);
  },
  a = (e, a, o = 5) => {
    t();
    let s = `<div class="alert alert--${e}">${a}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', s),
      window.setTimeout(t, 1e3 * o);
  },
  o = async (e, t) => {
    try {
      let o = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        data: { email: e, password: t },
      });
      'success' === o.data.status &&
        (a('success', 'Logged in successfully!'),
        window.setTimeout(() => {
          location.assign('/');
        }, 1500));
    } catch (e) {
      a('error', 'login or password did not match! Try again');
    }
  },
  s = async (e, t, o, s) => {
    try {
      let n = await axios({
        method: 'POST',
        url: '/api/v1/users/signup',
        data: { name: e, email: t, password: o, passwordConfirm: s },
      });
      'success' === n.data.status && a('success', 'Signed up successfully'),
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
    } catch (e) {
      a('error', 'Please fill the fields correctly');
    }
  },
  n = async () => {
    try {
      let e = await axios({ method: 'GET', url: '/api/v1/users/logout' });
      (e.data.status = 'Success'),
        window.setTimeout(() => {
          location.assign('/');
        }, 2e3);
    } catch (e) {
      console.log(e.response), a('error', 'Error logging out! Try again.');
    }
  },
  r = async (t, o) => {
    try {
      let s = await (function (e) {
        return e && e.__esModule ? e.default : e;
      })(e)({
        method: 'PATCH',
        url:
          'password' === o
            ? '/api/v1/users/updateMyPassword'
            : '/api/v1/users/updateMe',
        data: t,
      });
      'success' === s.data.status &&
        a('success', `${o.toUpperCase()}updated successfully!`);
    } catch (e) {
      a('error', e.message);
    }
  },
  d = Stripe(
    'pk_test_51NMt3dD1RDCIX8YPcCiP9QzLJsQFhgNLTB0W0Ux95f37VDMy9q7bz3MDqPnD3hVEoMYhEAGgebR18vlhwZHjvOxE004N1DeIWW'
  ),
  l = async (e) => {
    try {
      let t = await axios(`/api/v1/bookings/checkout-session/${e}`);
      await d.redirectToCheckout({ sessionId: t.data.session.id });
    } catch (e) {
      console.log(e), a('error', e);
    }
  },
  c = document.getElementById('map'),
  u = document.querySelector('.form--login'),
  i = document.querySelector('.nav__el--logout'),
  m = document.querySelector('.form--signup'),
  p = document.querySelector('.form-user-data'),
  g = document.querySelector('.form-user-password'),
  y = document.getElementById('book-tour');
if (c) {
  let e = JSON.parse(c.dataset.locations);
  ((e) => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic2FoYWtob3ZoYW5uaXN5YW4xMTEiLCJhIjoiY2xpenFiNTQ5MGdxbzNkdDhydjFpMWFiMyJ9.WU8lPhN_kckM8_XAGq9AEA';
    var t = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sahakhovhannisyan111/clizqin6f00b901qq211xavwa',
      scrollZoom: !1,
    });
    let a = new mapboxgl.LngLatBounds();
    e.forEach((e) => {
      let o = document.createElement('div');
      (o.className = 'marker'),
        new mapboxgl.Marker({ element: o, anchor: 'bottom' })
          .setLngLat(e.coordinates)
          .addTo(t),
        new mapboxgl.Popup({ offset: 30 })
          .setLngLat(e.coordinates)
          .setHTML(`<p>Day ${e.day}:${e.description}</p>`)
          .addTo(t),
        a.extend(e.coordinates);
    }),
      t.fitBounds(a, {
        padding: { top: 200, bottom: 150, left: 100, right: 100 },
      });
  })(e);
}
u &&
  u.addEventListener('submit', (e) => {
    e.preventDefault();
    let t = document.getElementById('email').value,
      a = document.getElementById('password').value;
    o(t, a);
  }),
  m &&
    m.addEventListener('submit', (e) => {
      e.preventDefault();
      let t = document.getElementById('name').value,
        a = document.getElementById('email').value,
        o = document.getElementById('password').value,
        n = document.getElementById('passwordConfirm').value;
      s(t, a, o, n);
    }),
  i && i.addEventListener('click', n),
  p &&
    p.addEventListener('submit', (e) => {
      e.preventDefault();
      let t = new FormData();
      t.append('name', document.getElementById('name').value),
        t.append('email', document.getElementById('email').value),
        t.append('photo', document.getElementById('photo').files[0]),
        r(t, 'data');
    }),
  g &&
    g.addEventListener('submit', async (e) => {
      e.preventDefault(),
        (document.querySelector('.btn--save--password').textContent =
          'Updating...');
      let t = document.getElementById('password-current').value,
        a = document.getElementById('password').value,
        o = document.getElementById('password-confirm').value;
      await r(
        { passwordCurrent: t, password: a, passwordConfirm: o },
        'password'
      ),
        (document.querySelector('.btn--save--password').textContent =
          'Save password'),
        (document.getElementById('password-current').value = ''),
        (document.getElementById('password').value = ''),
        (document.getElementById('password-confirm').value = '');
    }),
  y &&
    y.addEventListener('click', (e) => {
      e.target.textContent = 'Processing...';
      let { tourId: t } = e.target.dataset;
      l(t);
    });
const w = document.querySelector('body').dataset.alert;
w && showAlert('success', w, 20);
//# sourceMappingURL=index.js.map
