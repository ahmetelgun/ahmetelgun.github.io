---
layout: post
title: Bilgisayar Sayıları Nasıl Anlar?-1
comments: true
tags: [ones' complement, two's complement]
---
Bu yazıda işaretli ve işaretsiz sayıları ve bunları iki tabanına geçirmeyi anlatacağım.

Bilgisayarlarımız her şeyde olduğu gibi sayıları da 2'lik tabanda (binary) işler ve saklar. Bunun için bilginin 2'lik tabanda bir sayıya çevirilmesi, daha sonra bu 2'lik tabandaki sayıdan tekrar bizim anlayacağımız hale döndürülmesi gerekir. Sayıları kabaca 3 gruba ayırabiliriz. 
* İşaretsiz sayılar (Unsigned numbers)
* İşaretli sayılar (Signed numbers)
* Kayan noktalı sayılar (Floating-point numbers)

## İşaretsiz Sayılar

İnsanlar genellikle 10'luk sayı sistemini kullanır. 10'luk sayı sistemini 2'lik sayı sistemine çevirmek için lise bilgilerini hatırlamamız yeterli. 10'luk tabandaki (9)<sub>10</sub> sayısını 2'lik tabana çevirelim.

![](/img/bolum.png)

2'lik tabana çevireceğimiz sayıyı bölüm 1 olana kadar 2'ye bölüp ok yönünde soldan sağa yazarak 2'lik tabandaki işaretsiz sayımızı bulduk. (1001)<sub>2</sub> 

Günümüz bilgisaylarında her bir bayt 8 bit olduğu için kalan bitleri 0 ile doldurmalıyız. **00001001** sayısı 1 baytlık **işaretsiz** bir sayıyı temsil ediyor. 1 bayt ile [0,255] aralığındaki pozitif tam sayıları ifade edebiliriz.

## İşaretli Sayılar

8 bitlik işaretli bir sayının en solundaki bit en anlamlı biti **(most significant bit)** ifade eder. Bu bit, değiştirmemiz durumunda sayımızı en çok etkileyecek bittir. Bu bit sayımızın işaretini tutar. 0 ve pozitif sayılar için **0**, negatif sayılar için **1** değerini alır. O halde işaretli sayılar ile çalışırken [00001001] değeri 9 sayısını verirken [10001001] değerinden -9 sayısını vermesini bekleriz ama [şuradan](https://www.rapidtables.com/convert/number/binary-to-decimal.html?x=10001001) da görebileceğiniz gibi -119 sayısını elde ederiz. Bunun nedeni [00000000] sayısı sıfırı verirken [10000000] sayısının da sıfırı vermesi. 2 farklı baytın aynı sayıyı vermesi kaynak tüketimi açısından iyi olmadığı için tasarımcılar bunun için bir yol geliştirmişler. İlk önce negatif olarak ifade etmek istediğimiz sayının pozitif değerindeki 1'leri 0, 0'ları 1 yapıyoruz. 
[00001001] => [11110110] Bunun adı [one's complement](http://bilgisayarkavramlari.sadievrenseker.com/tag/1s-complement/). Arkasından sayımıza 1 ekliyoruz. 
~~~
11110110 
       1
_______+
11110111
~~~
Buna da [two's complement](http://bilgisayarkavramlari.sadievrenseker.com/2007/11/28/iki-tumleyeni/) diyoruz. Son elde ettiğimiz sayı -9'un ikilik düzendeki karşılığını veriyor. Two's complement sayesinde 8 bit ile [-128,127] aralığındaki tam sayıları ifade edebiliyoruz. 

Burada **11110111** sayısının işaretli mi işaretsiz mi olduğunu nasıl bileceğiz diye sorabilirsiniz. Karşınıza çıkan sorularda genellikle sayının işaretli olup olmadığı söylenir.

Bir sonraki yazıda kayan noktalı sayılar (floating-point numbers) ve IEEE 754 standardından bahsedeceğim.

Elimden geldiğince bildiklerimi anlatmaya çalıştım. Hatalı gördüğünüz, ekleme yapmak istediğiniz, uyarı veya öneri yapmak istediğiniz bir nokta varsa lütfen bana ulaşın.
