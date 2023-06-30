var e = require('axios');
function t(e) {
  return e && e.__esModule ? e.default : e;
}
const a = () => {
    let e = document.querySelector('.alert');
    e && e.parentElement.removeChild(e);
  },
  o = (e, t, o = 5) => {
    a();
    let s = `<div class="alert alert--${e}">${t}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', s),
      window.setTimeout(a, 1e3 * o);
  },
  s = async (a, s) => {
    try {
      let n = await t(e)({
        method: 'POST',
        url: '/api/v1/users/login',
        data: { email: a, password: s },
      });
      'success' === n.data.status &&
        (o('success', 'Logged in successfully!'),
        window.setTimeout(() => {
          location.assign('/');
        }, 1500));
    } catch (e) {
      o('error', 'login or password did not match! Try again');
    }
  },
  n = async (a, s, n, r) => {
    try {
      let d = await t(e)({
        method: 'POST',
        url: '/api/v1/users/signup',
        data: { name: a, email: s, password: n, passwordConfirm: r },
      });
      'success' === d.data.status && o('success', 'Signed up successfully'),
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
    } catch (e) {
      o('error', 'Please fill the fields correctly');
    }
  },
  r = async () => {
    try {
      let a = await t(e)({ method: 'GET', url: '/api/v1/users/logout' });
      (a.data.status = 'Success'),
        window.setTimeout(() => {
          location.assign('/');
        }, 2e3);
    } catch (e) {
      console.log(e.response), o('error', 'Error logging out! Try again.');
    }
  },
  d = async (a, s) => {
    try {
      let n = await t(e)({
        method: 'PATCH',
        url:
          'password' === s
            ? '/api/v1/users/updateMyPassword'
            : '/api/v1/users/updateMe',
        data: a,
      });
      'success' === n.data.status &&
        o('success', `${s.toUpperCase()}updated successfully!`);
    } catch (e) {
      o('error', e.message);
    }
  },
  l = Stripe(
    'pk_test_51NMt3dD1RDCIX8YPcCiP9QzLJsQFhgNLTB0W0Ux95f37VDMy9q7bz3MDqPnD3hVEoMYhEAGgebR18vlhwZHjvOxE004N1DeIWW'
  ),
  u = async (a) => {
    try {
      let o = await t(e)(`/api/v1/bookings/checkout-session/${a}`);
      await l.redirectToCheckout({ sessionId: o.data.session.id });
    } catch (e) {
      console.log(e), o('error', e);
    }
  },
  c = document.getElementById('map'),
  i = document.querySelector('.form--login'),
  m = document.querySelector('.nav__el--logout'),
  p = document.querySelector('.form--signup'),
  g = document.querySelector('.form-user-data'),
  y = document.querySelector('.form-user-password'),
  w = document.getElementById('book-tour');
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
i &&
  i.addEventListener('submit', (e) => {
    e.preventDefault();
    let t = document.getElementById('email').value,
      a = document.getElementById('password').value;
    s(t, a);
  }),
  p &&
    p.addEventListener('submit', (e) => {
      e.preventDefault();
      let t = document.getElementById('name').value,
        a = document.getElementById('email').value,
        o = document.getElementById('password').value,
        s = document.getElementById('passwordConfirm').value;
      n(t, a, o, s);
    }),
  m && m.addEventListener('click', r),
  g &&
    g.addEventListener('submit', (e) => {
      e.preventDefault();
      let t = new FormData();
      t.append('name', document.getElementById('name').value),
        t.append('email', document.getElementById('email').value),
        t.append('photo', document.getElementById('photo').files[0]),
        d(t, 'data');
    }),
  y &&
    y.addEventListener('submit', async (e) => {
      e.preventDefault(),
        (document.querySelector('.btn--save--password').textContent =
          'Updating...');
      let t = document.getElementById('password-current').value,
        a = document.getElementById('password').value,
        o = document.getElementById('password-confirm').value;
      await d(
        { passwordCurrent: t, password: a, passwordConfirm: o },
        'password'
      ),
        (document.querySelector('.btn--save--password').textContent =
          'Save password'),
        (document.getElementById('password-current').value = ''),
        (document.getElementById('password').value = ''),
        (document.getElementById('password-confirm').value = '');
    }),
  w &&
    w.addEventListener('click', (e) => {
      e.target.textContent = 'Processing...';
      let { tourId: t } = e.target.dataset;
      u(t);
    });
//# sourceMappingURL=index.js.map
