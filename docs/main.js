function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " Jahre";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " Monate";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " Tage";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " Stunden";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " Minuten";
  }
  return Math.floor(seconds) + " Sekunden";
}

function experience () {
    return timeSince(new Date('05/02/2021'))
}

function loadAuszeichnungen () {
    zGET({ url: 'auszeichnungen.json' }).then(a => {
        a = JSON.parse(a)
        
        let i = 0

        for (const auszeichnung of a) {
            let nachweisliste = ''

            for (const nachweis of auszeichnung.proof) {
                nachweisliste += `<li>- <a target="_blank" href="${nachweis}">${nachweis}</a></li>`
            }

            let html = `
                ${i == 0 ? '' : '<hr>'}
                <h3>${auszeichnung.name}</h3>
                <p>${auszeichnung.description}</p>
                <br>
                <p style="text-align:left;"><b>Nachweise:</b><br><ul>${nachweisliste}</ul></p>
            `

            if (auszeichnung.date) {
                auszeichnung.date.replace('$1/$2/$3', '$2.$1.$3')
            }

            html = html.replace(/\{(.*?)\}/g, function (match, key) {
                return auszeichnung[key]
            })

            $$('#auszeichnungentext').inner(`${$$('#auszeichnungentext').inner()}<div class="auszeichnung-single">${html}</div>`)

            i += 1
        }
    })
}

$$(document)(() => {
    $$('.menu-icon').on('click', () => {
        $$('.menu-list').toggleClass('active')
    })

    loadAuszeichnungen()
})