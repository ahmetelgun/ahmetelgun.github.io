---
layout: post
title: Cookie nedir?
comments: true
tags: [http, cookie]
---
Bu yazıda hemen hemen her internet sitesinde karşımıza çıkan cookieleri inceleyeceğiz. Önce kısaca tarihinden bahsedip arkasından hiç bilmeyenler için ne olduğunu anlatacağız. Arkasından geliştiriciler ve meraklılar için biraz daha derine inip teknik kısımlarını inceleyeceğiz. Şimdiden keyifli okumalar dilerim.

## Tarihi

Cookie ismi, cookienin mucidi [Lou Montulli](https://en.wikipedia.org/wiki/Lou_Montulli) tarafından, Unix programcılarının kullandığı [Magic Cookie](https://en.wikipedia.org/wiki/Magic_cookie) teriminden esinlenilerek ortaya atılmış. Lou Montulli cookie fikrini Netscape'te çalışırken geliştirmiş.

HTTP protokolü stateless olduğu için tüm statelerin host bilgisayarda tutulması gerekiyordu. Netscape'in tarayıcıda da state tutmak istemesiyle 1994 yılında Mosaic Netscape 0.9 beta versiyonuyla birlikte cookieler ilk defa kullanıma sunuldu. 1995 yılında Microsoft Internet Explorer 2 ile birlikte cookieleri kullanıma sundu.

1997 yılında ilk defa RFC 2109 ile spesifikasyonları belirlendi. Zaman içinde RFC 2965 (2000) ve RFC 6265 (2011) spesifikasyonlarıyla günümüzdeki haline ulaşmıştır. Günümüzdeki güncel versiyon RFC 6265'tir, diğer iki RFC Historic statüsündedir.

## Cookie Nedir?

Girdiğiniz hemen hemen her sitede "Cookie (veya çerez) politikası" ile ilgili yazılar görmüşsünüzdür. Cookielerin ne olduğunu merak ediyorsanız bu bölümde size kısaca anlatmaya çalışacağım. Eğer bir geliştiriciyseniz ve daha fazlasını merak ediyorsanız yazının devamını da okumanızı tavsiye ederim.

Cookie, tarayıcılarda text halinde bilgi saklanması için geliştirilmiş bir yöntemdir. Cookieler session yönetimi, kullanıcı takibi ve kişiselleştirme gibi amaçlar için kullanılabilir. İlerde değinilecek bazı konuların daha iyi anlaşılabilmesi için session yönetiminden biraz bahsedelim. 

Bir siteye kullanıcı adınız ve parolanız ile giriş yaptınız ve sitede gezinmek istiyorsunuz. Kullanıcı adınızı ve parolanızı yazdınız ve butona tıkladınız. Site bunları kontrol etti ve doğru olduğunu gördü. Bu aşamadan sonra sizden çıkan her isteğin sizden geldiğini anlayıp ona göre davranması gerekecek. Çünkü profil sayfanıza gittiğinizde sizin bilgilerinizi getirmek için kim olduğunuzu bilmek zorunda. Bunun için oluşturulmuş bir anahtarı siz giriş yaptığınızda size verip her istekte bunu sizden isteyebilir. Ama kullanıcı o sekmeyi kapattığı zaman bu bilgi de kaybolacağı için kullanıcı her seferinde yeniden giriş yapmak zorunda kalacaktır.

İşte cookiler ile session yönetimi tam da bu noktada işimize yaramaktadır. Siz siteye giriş yaptıktan sonra site sizin kimliğinizi belirten anahtarı direkt size vermek yerine tarayıcıya bu bilgiyi cookie olarak verebilir. Cookiler tarayıcının veri tabanında saklanır ve tarayıcıyı kapatsanız dahi silinmez. Bir sitenin tanımlamış olduğu cookieler o siteye giden tüm isteklere* tarayıcı tarafından otomatik olarak eklenir. Bu sayede giriş yaptığınız bir siteye 3 gün sonra tekrar girdiğinizde site sizi hatırlar ve tekrar giriş yapmanız gerekmez.

Aynı şekilde bir site size özel bir cookie oluşturarak sizin neler yaptığınızı takip edebilir. Google'a giriş yapmamış olsanız dahi Google'da 'Dodge Challenger' aradıktan sonra Facebook'a girdiğinizde karşınıza Dodge Challenger reklamı çıkması cookieler sayesinde olmaktadır. Google'a ilk girdiğinizde Google sizin kim olduğunuzu bilmese bile size özel bir cookie oluşturdu, siz 'Dodge Challenger' aramasını yaptığınızda bu cookie ile Dodge Challenger aramasını eşleştirdi. Arkasından içinde Google reklamları barındıran bir siteye girdiğinizde Google sizin cookienizle daha önceki aramanızı eşleştirerek önünüze 'Dodge Challenger' reklamı çıkardı. Bu gibi örnekleri çoğaltmak mümkün.

*Bazı kısıtlamalar sebebiyle tüm isteklere eklenmeyebilir, bunlara daha sonra değineceğiz.

## Biraz da teknik kısımlar

Tarayıcıda bir cookie oluşturmak için iki temel yöntem var: Set-Cookie header ve JavaScript document.cookie apisi.

**Set-Cookie Header:** [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) response headerı ile tarayıcıda yeni bir cookie oluşturulabilir veya var olan bir cookie güncellenebilir.  

**document.cookie:** JavaScript içinden [document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) kullanarak cookie oluşturulup güncellenebilir.

Aşağıda cookieleri gösteren, Firefox tarayıcısından alınmış bir ekran görüntüsü var. Bu ekran görüntüsünde bir cookienin birden fazla özelliği olduğunu görmek mümkün. Bu ekran görüntüsü üzerinden sırayla bu özellikleri inceleyelim.

![](/img/cookie.png)

### Name ve Value

Cookieler en basit haliyle key-value ikilisidirler. Her cookienin ismi ve değeri vardır. Bilgiler değer yani value kısmında saklanır.

### Domain

Bir cookienin hangi domainlere yapılan isteklerde gönderileceğini belirler. [mozilla.org](http://developer.mozilla.org) sitesi bir cookie oluştururken domain değerini vermezse varsayılan olarak domain değeri mozilla.org olarak belirlenir ve sadece bu domain için geçerli olur, subdomainlere gönderilmez. Yani [developer.mozilla.org](http://developer.mozilla.org)'a gönderilen isteklerde bu cookie dahil edilmez.

Cookie oluşturulurken domain değeri verilmişse subdomainler de dahil edilir. Mesela domain değeri [mozilla.org](http://mozilla.org) olarak verilmişse [developer.mozilla.org](http://developer.mozilla.org)'da bu cookielere erişebilir.

Bir subdomain üst domaini için cookie oluşturabilir. [developer.mozilla.org](http://developer.mozilla.org) sitesi mozilla.org domain değerine sahip bir cookie oluşturabilir, bu sayede tüm subdomainler o cookieyi kullanabilir.

Ama [mozilla.org](http://mozilla.org), [developer.mozilla.org](http://developer.mozilla.org) domain değerine sahip bir cookie oluşturamaz.

[mozilla.org](http://mozilla.org) sitesindeki bir dış kaynak kendi domaini için cookie oluşturursa buna **third-party cookie** denir. Mesela mozilla.org sitesi [example.com](http://example.com) sitesinden bir reklam yüklemiş olsun, [example.com](http://example.com) bu reklamla birlikte bir cookie oluşturmuşsa bu bir third-party cookie olur. [github.com](http://github.com) da example.com reklamlarını kullanıyorsa example.com bu cookielere erişir, bu sayede hiç example.com sitesine gitmeseniz dahi example.com tarafından takip edilebilirsiniz. Tarayıcıdan tarayıcıya third-party cookielerin davranışı değişebiliyor. Mesela Firefox bilinen takip cookielerini engelerken Chrome bir kaç sene içerisinde third-party cookieleri varsayılan olarak engelleyeceğini duyurdu. Tarayıcınızın ayarlarından third-party cookieleri engelleyebilirsiniz.

### Path

Path özelliği cookienin hangi path için geçerli olduğunu belirtir. Cookie oluşturulurken belirtilmezse mevcut path kullanılır. Alt pathler de geçerlidir. /docs pathi verildiğinde /docs/web pathinde de cookie geçerli olur.

### Expires/Max-Age

Cookienin geçerlilik tarihini belirtir. Belirlenen tarihten sonra cookie tarayıcı tarafından otomatik olarak silinir. Expires cookienin son geçerlilik tarihini belirtir. Max-Age ise cookie oluşturulduktan sonra kaç saniye geçerli olacağını belirtir.

Expire ***Wdy, DD Mon YY HH:MM:SS GMT veya Wdy***, ***DD Mon YYYY HH:MM:SS GMT*** biçiminde olmalıdır.

Max-Age ise saniye biçimindedir. Birbirlerinin yerine kullanılabilirler.

### Size

Tarayıcı tarafından hesaplanır ve cookienin boyutunu belirtir, protokolle bir ilgisi yoktur. Her tarayıcıda bulunmayabilir.

### HttpOnly

Cookielere erişmek için document.cookie kullanılabileceğini söylemiştik. Ama bazı durumlarda bu cookielere JavaScript üzerinden erişilmesini istemeyiz. Bunun için HttpOnly özelliğini aktif etmemiz yeterlidir. Sitede bir XSS açığı varsa ve saldırgan, hedefte bir JavaScript kodu çalıştırabilirse document.cookie kullanarak hassas cookielere erişebilir. Bunun için HttpOnly özelliği önemlidir.

### Secure

Secure özelliği true olan cookieler HTTP isteklerine dahil edilmez. Sadece HTTPS isteklerinde gönderilir. Bu özellik şunun için önemlidir: trafiğin dinlendiği bir ağda bir siteye HTTP üzerinden eriştiğinizde request şifrelenmemiş olarak gideceği için ağı dinleyen kişi cookieyi ele geçirebilir. Bunun önüne geçebilmek için session gibi hassas veriler içeren cookielerin Secure özelliklerinin aktif edilmesi önemlidir.

### Samesite

Samesite özelliği dış bir kaynaktan bir siteye girdiğinizde veya bir siteden diğer siteye giden isteklerde cookienin gönderilip gönderilmeyeceğini belirler. 3 farklı değer alabilir: None, Lax ve Strict

**None:** Hem cross-site subrequestlerde, hem site içindeki hareketlerde hem de bir siteden başka bir siteye giderken (navigation) gönderilir. Yani a.com sitesinin içinde b.com sitesine ait bir resim varsa b.com'a yapılan istekte b.com cookieleri gönderilir. Aynı zamanda a.com içinden bir linke tıklayarak b.com'u açtığınızda b.com'un cookieleri b.com'a gönderilir. **Samesite özelliği None olduğunda Secure özelliği true olmalıdır, yoksa cookie blocklanır.**

**Lax:** Cross-site subrequestlerde cookieler gönderilmez. Yani a.com sitesinin içinde b.com sitesine ait bir resim varsa b.com'a yapılan istekte b.com cookieleri gönderilmez. Ama a.com içindeki linke tıklayıp b.com'a giderken b.com'a ait cookieler b.com'a gönderilir.

**Strict:** Cross-site subrequstlerde ve navigation isteklerinde cookieler gönderilmez. b.com'a ait cookie sadece ve sadece b.com içinden yapılan isteklerde b.com'a gönderilir.

## Sonuç

İyi hazırlanmamış bir cookie güvenlik zafiyetine neden olabileceği gibi iyi hazırlanmış bir cookie de var olan güvenlik zafiyetlerinin etkisini azaltabilir. Mesela HTTPS yönlendirmesi olmayan bir site dinleniyor olsa bile cookienin Secure özelliği varsa saldırgan cookieyi ele geçiremez. Ama HTTPS yönlendirmesi olsa bile ilk istek HTTP ile gideceği için Secure özelliği olmayan bir token ilk istekte gönderilir ve saldırgan tarafından ele geçirilebilir. Aynı şekilde CSRF token kullanılmayan bir form da cookienin Samesite özelliği strict olduğu için zafiyete neden olmayabilir.

Cookielerin nasıl çalıştığının bilinmemesi ve gerekli güvenlik önlemlerinin alınmaması ciddi güvenlik zafiyetlerine yol açabilir.

## Kaynaklar

[https://en.wikipedia.org/wiki/HTTP_cookie](https://en.wikipedia.org/wiki/HTTP_cookie)

[https://datatracker.ietf.org/doc/html/rfc6265](https://datatracker.ietf.org/doc/html/rfc6265)

[https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
