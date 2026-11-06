// Jerome Co-operations: menu toggle and form handling. No dependencies.
(function () {
  document.documentElement.classList.add("js");

  // ----- Mobile menu -----
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Menu";
        btn.focus();
      }
    });
  }

  // ----- Forms -----
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fieldError(field, message) {
    var wrap = field.closest(".field");
    var err = wrap.querySelector(".err");
    if (message) {
      wrap.setAttribute("data-invalid", "");
      field.setAttribute("aria-invalid", "true");
      err.textContent = message;
      err.hidden = false;
    } else {
      wrap.removeAttribute("data-invalid");
      field.removeAttribute("aria-invalid");
      err.hidden = true;
      err.textContent = "";
    }
  }

  function validate(form) {
    var first = null;
    Array.prototype.forEach.call(form.querySelectorAll("[data-label]"), function (f) {
      var label = f.getAttribute("data-label");
      var value = f.value.trim();
      var msg = "";
      if (f.required && !value) {
        msg = f.tagName === "SELECT" ? "Choose " + label + "." : "Enter " + label + ".";
      } else if (f.type === "email" && value && !EMAIL.test(value)) {
        msg = "Enter an email address like name@example.com.";
      } else if (f.type === "url" && value && !/^https?:\/\/\S+$/i.test(value)) {
        msg = "Enter a full web address starting with https://.";
      }
      fieldError(f, msg);
      if (msg && !first) first = f;
    });
    return first;
  }

  function show(status, text, bad) {
    status.textContent = text;
    status.hidden = false;
    status.classList.toggle("bad", !!bad);
    status.setAttribute("tabindex", "-1");
    status.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll("form[data-form]"), function (form) {
    var status = form.parentElement.querySelector(".status");
    var submit = form.querySelector("button[type=submit]");

    Array.prototype.forEach.call(form.querySelectorAll("[data-label]"), function (f) {
      f.addEventListener("input", function () {
        if (f.closest(".field").hasAttribute("data-invalid")) fieldError(f, "");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;
      var bad = validate(form);
      if (bad) { bad.focus(); return; }

      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (el.name && el.type !== "submit") data[el.name] = el.value.trim();
      });
      if (data._gotcha) return; // honeypot: silently drop bots

      delete data._gotcha;
      data.form = form.getAttribute("data-form");
      data.page = location.pathname;

      var endpoint = form.getAttribute("data-endpoint");
      var email = form.getAttribute("data-email");
      var original = submit.textContent;

      if (endpoint) {
        submit.disabled = true;
        submit.textContent = "Sending...";
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (r) {
            if (!r.ok) throw new Error("bad status " + r.status);
            form.reset();
            show(status, form.getAttribute("data-success") || "Thanks. Your message has been sent.");
          })
          .catch(function () {
            show(status, "Your message was not sent. Check your connection and try again" + (email ? ", or write to " + email + "." : "."), true);
          })
          .then(function () { submit.disabled = false; submit.textContent = original; });
      } else if (email) {
        var subject = data.subject || (data.form === "talent" ? "Talent network" : "Website enquiry");
        var lines = [];
        Object.keys(data).forEach(function (k) {
          if (k !== "form" && k !== "page" && k !== "subject" && data[k]) lines.push(k + ": " + data[k]);
        });
        location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        show(status, "Your email app should open with the message ready to send. If it does not, write to " + email + ".");
      } else {
        show(status, "This form is not connected to an inbox yet, so nothing was sent.", true);
      }
    });
  });
})();
