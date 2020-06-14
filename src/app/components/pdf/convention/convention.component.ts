import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {ConventionService} from "../../../services/convention.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css']
})
export class ConventionComponent implements OnInit {

  constructor(private conventionService:ConventionService) { }

  ngOnInit(): void {

  }

  get conventionStage(){
    return this.conventionService.convention;
  }
  dismissConvention(){

  }
  downloadConvention(){
    pdfMake.createPdf(this.convention()).save();
  }
  openConvention(){
    pdfMake.createPdf(this.convention()).open();
  }
   convention(){


    return  {
      content:[
          {image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAABnCAMAAAAzHdcBAAABLFBMVEX///+jURkjaskmbMqRtORxnt3L2/IzdM3e6PfZtp/cvKf///4vccz19fU2ds3j7PieRgqhTRT69vP06uP4///UrZPv39XNoIHix7T38Ozq8fqfSQ67eEx2dnVIgtKxyuzt7e2GhoXNzc0+fM/A1PDs28+uYy/hxbK3dEaaPgDy5t3l5eW0tLSqqqqhoaB5pN6gvufn0MGpWSK+gViYmJe8vLxSidTCimSyazrNnX3Hk3Du/f+Jwe9sjNHr5fCLi4pQl+BcoeSHnNWqr9udzvO9wOLR0Oe/4/qbqNnMyuUdYcXf9f7O6/tur+m03PiIvezg2+xpaWg1NTR+mNVcgc01gNZdktdbfc315eyi0fGkrt2YuOW7yOaEqd5pquesuuFBQUBZWVcXV8KVn9ZgRsaIAAAYnUlEQVR4nO1cCV/iOtcPrVCgC1B2iqAiBWFGhSqbUhEFtW7Mw+KMo/LcZ77/d3hPkpZlBIFZ7h3f3z0zdklOQvPPyck5J2kR+pf+peWJl2Ve5vl/+jH+GZLTrnBZy1bUCqa4Vg1G/P/0M/2tlHOVK8WKb2dHUXwKJu+OV1WL8XBB/qcf7e+hqEsrer2Kz+UPql4bIcVXK+QqXsXrq1TT//Tz/X7KVVWv1wft9hVDyF9T8KVXLSBUI3goXpuW+f+tHvzVos2r0M73xkHwgwCCt5JDyG2KhA/O2ciiemJO8e943N9APAi/ormyJgreIKRVvYoKEPhVxUSgGiwCU+jtmvYEx+97TMdN4LfVnY7jxith5FLN0QAzAR/3wkCwRoKvnMthNLzF4JsDws6siMHSw+vq+UkQLlarfHkK2ry0q10oWvXhbvdWITkdhkPI5sM52QKKqiaXlnujLjv743Lg8UzeOaf7XOwZCal/tEp9zqW5o2XS97h5Puj4CG6qr2i1E4uB4qvKiNdMvUAV5Tz6CQz47peJu43EdJ+LTeFCT65UX/18SU5/1uszMbApKowBvwaYeMNmbtFnU4puuApbEECCzzW3up/AQBcS5+O+bzH9L4i/GmtY3rGiMuiw3D65iHn0NxlDFa9NrSgmCt4yJMk1r0+pUJso6IVux4ZBwQJKKWaLihKcV99PYNBijNPRDd9lmHPUKU2Jc+t2lfoeGbYEJ/E5xe6/xZcmg7xWVaxpEXc59LlPyZAnySreCp4J5IrFkA2qPlAK4TkV/gQGsa4xIbydFGjXR+56kuNbY5X69LrxglC7xwjG1zfYcgQCn88VKXrHowHPi0QioPe9aogmmDZCLZRVyMUcSfgZnXiWmOz1bj+GzphJpcDXSyvV98jeoA7HsKmBcz5TNOu1lGHOvPTWSE55R43CKbxTJBZymo4ExRe0VKNPcc+s8mcwaDfwiI+ZKuAMJoG2cY7nTh78V57f7hoD7MjS2dS8MKdWnudHV2YBmE2FG/6SSe17TOZZ0/BY1SvFqEynBzI3YNknxkF2h7aUMnqLEUsgoIht5uwwFwN+uLYIg88J6LdEKvVMlF+bvUCfuVtZFgnJV0ZqMAiYd3BP/r8imibrTlHkO+w532SkL7yZMQuDsDUpQvM0uKUugkby0thEyClUKiJEGWDNkLG0J4wGdZZLPYWBmBzd8JeGsb0AA75+J/dYQTDu8Z0ubCP54dTq4OhD4+hz4hpLBGWeEAXKQjhpPt/CIiWm7vk2y7LHI5ZXFFGKFUsX2sA+Ii4CdDD1CapZcBWKeEAgmagAb9YPdpJiIVCsmGi9gUHTECwt12EZZpFW5+3nHYPjJLZBfvXBAag0rAlxyHzxNIWbBVVY9NW4wJjCPDOU8AQzh8ARKFbdFVMWiDJ0YRCUOIEsGvejGlV8bgKBFh2pRrAra67KTL04iUGbE1jOVGrN/l5voZU3uO3YUxwnHOMbvg4m0zdLTeoPgiQI0pe3ik/Q0MB1fMM61LMmsfNMbLAAfUpYDtuUsTKkIFBBcBVQeCwG3jhcp20+KgTxUAgkAjvZb2Ag1y/aKbZPu67UAOG+fsU+Tc0GQpeskKB3lyA3j32zTMsAQUpihqWIf8BC16LziN4rzUY/ohBHIIzSdEbw2XCDiMdMZTwakkMmJx4IGI4y9Z9sQRQqKmPdMUmTcuB0OroCQwY3GjADu2RfQAngADkw+RJYki0MRMeT/QvMlYNFdVhVJeAwSJHrvQFzNwsC0+jB8oztwtGsCCaxzzcdMdKwrYj1HxUD7C74zTjT6wlyAgPxWWA4ztQCA4ZlJXYBCRz8sSxH77CF05oyGZBjUQ0j4jizPlIvM3MMBa3ICJ4LiTI0JRv62rQRTIKWK6MsqhpR3Aq1Vb4PM44xEOuMAPJrUAw6dU4SmCWonxyafNhyfpzWo7GesUwdr8iYhYHfUvDQjKgJAnGYYfR7SfhgRFXwqYjhHCr6TL1gAUinkzkYtBk2YV9be7bE0FmX1hbT1xj0Nr18ToJR8d1EoC9RBanm69Tt86z5pLpjGzUDNx2DoBDTEA/1yZZFVcs5wJ4j0QsEDLMwLTMLgyFzPiXHZ8wpWpl+NDDnWexjymXV5jXNHZ8ND3/SQNr0jOKNj1ndilcjk6UMoqNUsIRY5qXiVdTKd9biGIMrloKv78Vw6UuWWcn7/wkanneE/hKWhJwOakUaPqTuEdYDppqHWXOsFbUdM56SUUy4CuYE6atUX6++TOiDBzqW9bWu/fl5wDKnsZ9o1woU44yS1Fjyx0JhEj6k80AUBxHoZBhVd0ausb9oWUIYJCIoRAy8Ni0ya9llYl74ZtlE7ZQBqux0pTjYT1BsIFzoyxqU0Nog9pnpPFDwjQw/907WMq/dO9RsBC3qowKDZ0hF0easuExgcDW2bJ8Gg/PfFxL+nnjnar+VKys+cx6oekd6IO61mqh5zQHvVszYQg2bC5l59U1g8FmaaZn8iRT0KbT/o6rXCqUWLInw28omW82ruCgXqMz5i7ATGPD23xYJ/+WUsZn971K8lt2nZc08xXQJ5MpOVqYp3vIb66+TtvL236UBfgGBX0j6n8/uWBZiwTSTypZHUPB5qfzXdrS3lqB/Jo70j1J1h1oG7p2R7RsnEiGPpv+gqRtltfjmbgQLA57Gv0Y0yfNHrtzKKh314EhZutBFJCI9cgy1HSoGBe/sOKJF71YOkEs1lxN2LCvZTwa9y4qSyKrJEa683YvvF4OoSvvfbxu5jOGQdcCUtiYKbe7qCiUTA/4VbTh4Eu+0xsY0lL9geOiTAXTHD6jjstn/5VE3ZyLQ+6M1ZpePzppydsHauyUHr+K9l8zptRn05WUPDv1O5c8Les6mKVnT9x1I3HfUJxalxfq9I7DCmiuhYJWeM0XLD/TD+M+NTKGaaT2FtAWPOgcDOd8zGkckyM3LT/VGjNebr4PiiMaFF6Kh9yejcpcGe39pcBKNW8vPAMUVw5QC0cTyBjOmiGkKRUdrynKER+lRp8eD03xzaTwWkDkvmO2C3npOgg3LdwaMUTrizyZjfONWjxdRZpGHtIq/nIyJ6ALDXTwyx56vUOFw7dFIxVBbYm5Ry1jNTk1b/VsehQ7SUfyfUtQaAq4aepvm6US++/JsYG96yBkMiATq9hdFWL+n9pqzTsLk/BNzPE6OPeHAI1UAumRITCKA11vvUNM4nlPTbArFTcPAVbWS/DLyWz0SsubI4Ly1VovmYXBlGC+De7x6xJ4mkx703VLiMlQ3Ej0aqudT95MZIt67oXe5e6RfNjzbmGUfgBjigOQKNMIgPbOjI1bTfxiD2HBAeqrFsFSO2/NXPubQM3ss0qUqcRoDTHzXIDt1TI9xKF2jDjtaoFkqHjXCQK7OsoRdlnL8IQz4iT02bUagqkpnx+2wfF3H/TynN4nLOElcRAatYmHQIaGpGIx7nRMEGsImm1Wu8GLleOvOo7AE4CMMUHDWbiOXpRx/DAM7aTXo/bUb1DUMEueSH0aSyjepAu9w80bwxtpYgXageRYGj6SVeuIaPRnnTxxRs61UACvKL0juWbsXOiyzhPYZYxCZZQBkLOW4GgZJ+sMd0kF803FlnMNMvmf07/BSWmPUQok0vZMS2DlhwMk166Fxi1I0TCf2yK6NFhyfjJekncOlu1jzyg+3MDysNbZ6KsUs1o9jDNIzMJALlnJcCYMOXUSHpy7hSfHBeUX7ecj2Y/CEJUvwdbLIyj+cOh+M2euyXfv4Wn9oHKUa9LpNVrFiwi2kMixdV9Q5rHC6wPHNXF7qMHedJYLaYwzk6OtceeQqroIB3zUDyTrXv/E4m8K9Q7j1AMUe8brPt/5o8A8h39FlEnePhqXGtlOlUilhxiChR59vPCbFLhNHCemCXvdO8ane8MSeSgLHnuO07j0cmzBKHg1L/d7HHhorYPA2rYJBJ2GNwUtWkjiWgyOlFB4cl6Wx1k4IElkbSwkJM3HfwKtt1krbo8FwVmEJhn2PHd9adaZGSfiCAwVwZspBG7iFVeTgl2HA10dy3REw4fU/gRLG4Nt49uYTLCTulRiGTZmz2JQcoI0eI4yILaEzw7zmuNGR4+iN+SMYA1MninUAdAkMsr8cA1kaqSEdP2Vp/zlFHpQjC7F8c2zJtuC5U6AuhwOpP3smb5esohzHlgJil9xCd88jjEHTanfsebCSPnibVsBAF0YmSrd/48ROXMxpEejEp9F0d8UknHTuB455FTvH5KG3Hg+Ucs6lAP91hDLfnKNsJ0l+aw/yBEUXvdYzxuCzxNjJ1lJH12i8VaQlLPGAM0kfLPKKTOvskWGX85/EjQ3z9EoesVsL6ZQBoXx+Y14lEzqxybBCaTAoCezs5X8kdvc8MYddWMaAeU0b9VLCWFBSbJbOY7GnAce8tkC31s2L9UN83N2AQ/7T+jq+3YTTLsk8JJkHeZRfz6NDnL2Zh4QPcMZXH3D24e50zZN7MLoM2QHBMK+se5McPRbPBz+2FtPCXthCy2cowGQzczvY1n8+kPMhOW/8F7dma10Utz4dovW8mN88wbmfCFLQ2k/A9fFApFGOk/UtKPJxE338CHcfDqZrnrSR+P1BKpVK2OevN4uXKYYp/dhSjPg0uEaLF9X0LsMwLzP4tjbXN3A16+sYgw+fTkgaHPLrIulr3M78+jq+3Nw4wNkfzQ7ftUQIfSRl38AAUIgBvd2SZPJ3r8Q49md2wtbHD7hdu7ukL9e3cGMJBtDrBINdSN/9QHJPdtdx95sYbHzasCpZAoM/mbZ2cU/nP4m4rdD43V0TA3GdYnACo2M9n8d9vv6fLVzk4y4ZC4cno0oIBofvF4MDdLiOTj6S/j7YJTqSYHByALIP159Eoh/wkNhcJ83+8Bcoy03xw1gHflg/ODhYn68T/3ACDNDJ5iaV+U+fNtf/ykO7d3c3N0W0frJL1N7BX5ubf0ELTzY2cYd/PNjI5/NTcnByeHh48p7lAOX/u0Uw2NrcyG/sHgAGHzY/Qd767kdABEbF1sYGlo/NfP5TfqQPYPxYlbz/sQDNQQQDPPRhDiBjAewDETQgTHzokKrILTw34ntrXjgYCcJ714nWk+9+EMksCY3Nb+Je3kB4jgAsNomBBNPHJr23MBDXT3ABGBML7YM/m7YsTbZ7aMJxeJAns+UBaTNMlptE5jc2N07yxGw4/LQJhAfJwfrmCbYoP5Cx8G51orhhXYiWc7BB0/KInizXwEoWxfwWEAVm63ALUSdiXJNJ7weDV8TPiKDNInmRi/2OMci9ucFmTK4FS+/zMbjCu+hvkPx8i23jjt2+H+DxXua1O/4S+0x79r29wfY+5ULoCc7niB/iHfh3qG039/bpz4O1mHUa7vNfCb++d4Paz0c02SrTsa+4H3DpOFJ1AcNcDL6xe3vQujaDg3xtdrDH3PLCMZKle568t/JsZ0v27V5pb28PY9AU9uzgb9b7UOqiw708kxiD2Gs8S6WALpX2hEag2+AfEpi//b8X1BKOaDKqS1DmTufszwvfHpqi3xFTnSb6fibfPe2eIrmHV0lv5AfA4OGYf6Dv7kjQ7w/WehCOg11KARqTvGLuYm28zPZZuPfoyUAzEUC6A3VPTf42K9xc9QPfaDIt02a+xDqL3iKbolB8MQ8m1w9j8CiUEi/Q7Re6dB2lS19yahIDGTCQe6lSqYHjIs0GbtpNVyqVSjd8UxBOSbSkJbGlO97cCQ0YEP6jdsp++tQ/osl8lyNlLqHMShsQQmrQtQxpP4zBZf/r1yT0zssecy7Tt7bkFO75aQxO9/f3AyYGV+x1twH32AFP1vFCWswjbje5m/rpCAPCf9V39gaJo94pxaAEadexmJisr/StADniXo4WxR0XjIVm325PNPDmA/HyGFoQ0IVzwAB7pASDBysw1GyIYjdhyvWZcIMepWu8YvQF/i6GwoXYug00T034rrijlpEIAJs4vA3USdC+BWXOuB8J0v00zccAL6noeMH9yrjRe5wE46ENx8a1/CCkpBLCwiH3hFSKwwOlyaSk/h1fZ1Mp4VisCzQVXbIp4SUgdwWJvUWgEwn/lzZ7LfekI9FMZqDMPS4jrLYJ41fRXAycOF3E23fFbQ9C2/iAPNvbgIxjGwhOHvOSxM7hfI14fNp24nQz6O7YxvXw5N7p5An/tegIIA/8mcm0DD8q83fTO7aRfhm9OwzwJrDofC1nZUX9KPTKfOBDM7ePvTsMqhGE0tmZroI/w0OWLIcjblRzp7EJFUlPvb2jzfwoyh+DwbJvxIXwO8zqTEEIVQGDop8vgDDEM5kKJGXSU2+vzDYVRns07QmgmyHYMKlT0FaX+OI5CWmpe6Q3U4njgF66QZ3SdSdxga4agdZpgB8mUmDWwBVqNdAQ8x6jJ0gb6zao5xx9rkNJ/hLvZmnjX7lDLTjiZQq9h3+re4z0xL04wIk36KqUGjjQ5Qvim6/Xeuh+UAsD2Z82e9lvbdNMq364ichaJkK38AJmUX8aX4b8eOdy+vVnICwMPksvyWQy1tmv9/eJ7t/vJfYdzT4kOsR6IrkmXOjsBdhM1+3/NVCLCzz20ZC5Tz70j/AHMM76iPDe6Oz99sN4fxlfN07RlQAldUnA7wKz58mudHQmJZM9mHzPBO4Ov+/NP5SOPgu3UMFRm7lN9rBvQT8FME2ubDybzRZy+C2lQsFfKVK3KarZyv6yls3GISsqq6pqYeBSi7mCWqwBe7wYwRiUfa9kyMIgKpmW/5n1DZNmg/4RGxhMPqQLd7Er4botCHdg7J+VAtjW1ZkvLby3sG/y6uzLtnNCDuqlwdHjQLqAep/Aamr1r8EKP4LCfLd/BCZW9wVvfGiCUflZuEPmNxDEGNQWi9Vf7VeMq66gS63l1HQ0qoULvnAE2imjcLamZYpgOeOskL9cqfjjBIOoWqsUgkVXIerPljEG4Wgu/srVGslBgpPIPrFHa2cJbhPekCJctCRivukC3jJy3U49l4YYgxg2g8BaHFIMyOYVcJtLLIFTdDicpEn2u+aadMH37rHD1AKmxDk6YySpBO4yd33Vv+brkoAxSMETNCzf4hswfudGptPQiZVKxRb0F4uqaiuqvqImo0IY1cIZpWijWZCsFm2qr5ABDEJFYCtCIRV4lQLSfJC58/0LbiM5SN07Sf9NYfCthDcGXDF0h6Jw7hhy123JU0+BoVsSH+6Ro8PdtfqgD/pgXGNecP1ij/glQf0BTEDcx8M9+zZ38VlIlVgYRJIDOxKPCQd2Fh6ZUoL5ArLikF7QZ+7c6fTw1IlAzZLD0ZuWg3A5mo1HIpmCLBciBaAI/MMfAPHHa9EI3ABFZXKCDB6rCMxo5sAhitIRXPD7SWU8Fo7JVosxBninWBNj4NEfTp1PiQsdmtbBY+GobYAcJKDnk3UhcdRmz531BmCGedvGsfOSmP2xWIBg0GZOdfamJe3vXwrXV2AhC6fosQSDCAQDPKgeGNB4v/YFOKdQwRFoDGf3NIB74Dt9EFKLxdFbmrmQpQ4Lqk1d4XOZwdc7MiwM5JIEYn+H9YElB7ijQPxBlXV6HPcS02FUt/FYuIaxjPWB+I1LlcDGvxQ4mCsuKe+Q4/rj7QuAwQZ3/Dl1gZ0p+eH8KgE6gb04A6151t+XQF6upGvIk3sNTw9vzbrgHyVcwbdTvG18+ln9Ex5gxhU0G85rtbde3PueXknBhH2AHV7cc6K17owXoMUYXYjmPTjV/CPplA9KOG7MLrd4Y1PvsEMKZMbEGPmUUswsZZ7IT8UC5Jc8ovUEpALMsWAJ3CQwB0Yfj/X/0Fdk/xgb6VeQX/uhLwq/JwzCETlcqMnBQtBVRZFwMB6PBONVOaRpoUIwXKu5NLUMFlEt7kK5cjRaBlXpcoPqqIVquYwWlmuFcAYF49r3H1gdGO8Hg2wwmnV73ZpLC6rpck0ru0NxTQ1q5Vo4WHbbykHVnQFjQQ0Wc+6dgt8WrlRrYfwWaKRci1crYTVtK6OsVlO/GzHJZ8/sH/wDKR6Mxt2+OGCQ0YJxaFhBjhcAC60QDdZQtpBWM6Any1WUlmveoF9FwVo1jN/8DqZ9FVTdCadtWTnulivv+Bvc8SC0oFIpurUCjAN/WdVyWrFYgEMVYxApFLO4yfAnx8taSJUJBvhaVquo4AsFtWxBc71vDMLpilurejNaJO3VkAZjXatU5ILsrlAMsKeIyjW+6gZDMqLy4TJgEAJL0Q+8uSy4FT6X5vLP/HDcO6Gg4itHKmmbK56RlSqKFyuuuDsbLhfVarCM1ExBqWRzyF1UK7WKW60WQWJAKIJqRnXFgyhUKRRdZU0rqkuuzfyRxGdc0WiEL+QKfhTJoQKYSYVoOhJ1ueRcAUX8UbfLBRZQweUH1wJMaVcBv92Br9OFEIpGchHkj6Rd7iXXav+lf+lf+pf+pT+V/g/NQpB8CDd2PwAAAABJRU5ErkJggg==',fit:[200,80],alignment:'center'},
          {text:'______________________________________________________________',fontSize:18,alignment:'center',color:'#4281f5',bold:true,lineHeight:2},
          {text:'CONVENTION DE STAGE',fontSize:18.1,alignment:'center',bold:true,lineHeight:2},
          {text:'Article 1 : Objet de la convention',fontSize:12.1,bold:true},
          {text:'La présente convention de stage a pour objet de  régler les rapports entre :',fontSize:11.1},
          {text:'- La Faculté des Sciences et Techniques de Marrakech, représentée par son Doyen Monsieur Moha',fontSize:11.1,margin:[0,20,0,0]},
          {text:'TAOURIRTE',fontSize:11.1},
          {text:'Adresse            : BP 549, AV. Abdelkrim El khattabi, Guéliz, Marrakech, Maroc,',fontSize:11.1},
          {text:'Téléphone        : +212 524 43 34 04',fontSize:11.1},
          {text:'Fax                  :+212 524 43 31 70',fontSize:11.1},
          {text:'et désignée ci après par Etablissement.',fontSize:11.1},
          {text:'Et',fontSize:12.1},
          {text:'- L’Organisme ci-dessous mentionné :',fontSize:11.1,margin:[0,20,0,0]},
          {text:'Nom              :'+this.conventionStage.organisme.raisonSociale,fontSize:11.1},
          {text:'Adresse        :'+this.conventionStage.organisme.adress,fontSize:11.1},
          {text:'Téléphone    :'+this.conventionStage.organisme.tele,fontSize:11.1},
          {text:'Fax               :'+this.conventionStage.organisme.teleFix,fontSize:11.1},
          {text:'Représenté par :'+this.conventionStage.organisme.responsable,fontSize:11.1,bold:true},
          {text:'Et désigné  ci-après par l’Organisme.',fontSize:11.1},
          {text:'Elle concerne :',fontSize:11.1,margin:[0,20,0,0]},
          {text:'Étudiant(e) régulièrement inscrit(e) dans l’établissement pour l’année universitaire '+this.anneeUniversitaire()+' et dont la carte d’étudiant porte le numéro du CNE suivant :'+this.conventionStage.etudiantCne[0],fontSize:11.1},
          {text:'Et dénommé ci-après le stagiaire.',fontSize:11.1},
          {text:'Article 2 : Objectif du stage',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'Le stage de formation a pour objet de permettre à l’étudiant de mettre en pratique les outils théoriques et méthodologiques acquis au cours de sa formation, d\'identifier ses compétences et de conforter son objectif professionnel.',fontSize:11.1},
          {text:'Le stage s\'inscrit dans le cadre de la formation et du projet personnel et professionnel de l’étudiant. Il entre dans son cursus pédagogique et est obligatoire en vue de la délivrance du diplôme.',fontSize:11.1},
          {text:'Article 3 : Lieu et période du stage',fontSize:13.1,bold:true,margin:[0,20,0,0]},
          {text:'Le stage d’une durée de '+this.conventionStage.durreStage+'  mois  et se déroulera du '+this.conventionStage.dateDebutStage+' au '+this.conventionStage.dateFinStage,fontSize:11.1},
          {text:'Le stage aura lieu à '+this.conventionStage.organisme.raisonSociale +' '+this.conventionStage.organisme.ville.nom,fontSize:11.1},
          {text:'1/3',fontSize:12.1,bold:true,alignment:'right',margin:[0,60,0,0]},
          {text:'_____________________________________________________________________________________________',fontSize:12.1,alignment:'center'},
          {text:'Convention de stage FSTG/                                                                    -Etudiant -',alignment:'center',fontSize:12.1,bold:true},

          {text:'Article 4 : Statut du stagiaire –Accueil et encadrement',fontSize:12.1,bold:true,margin:[0,200,0,0]},
          {text:'L’étudiant, pendant la durée de son stage dans l’Organisme,demeure étudiant de l’Établissement ; il est suivi régulièrement parl’Établissement. L’Organisme nomme un Encadrant chargé d’assurer le suivi technique et d’optimiser les conditions deréalisation du stage.',fontSize:11.1},
          {text:'Article 5 : Intitulé du stage',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'Le projet de stage est intitulé:',fontSize:11.1},
          {text:'Et son programme est établi en fonction de la spécialisation de l’étudiant.',fontSize:11.1},
          {text:'Dans l’organisme d’accueil, le responsable de stage, chargé du suivi des travaux du stagiaire est:',fontSize:11.1},
          {text:'Monsieur     : '+this.conventionStage.encadreurFaculte.user.nom + ' '+this.conventionStage.encadreurFaculte.user.prenom ,fontSize:11.1},
          {text:'Qualité         : '+this.conventionStage.encadreurFaculte.qualite ,fontSize:11.1},
          {text:'Téléphone   :'+this.conventionStage.encadreurFaculte.user.tele ,fontSize:11.1},
          {text:'E-mail          : '+this.conventionStage.encadreurFaculte.user.email ,fontSize:11.1},
          {text:'A la Faculté des Sciences et Techniques de Marrakech, le responsable de stage, chargé du suivi des travaux du stagiaire est:',fontSize:11.1},
          {text:'Monsieur     : '+this.conventionStage.encadreurStructure.user.nom+ ' '+this.conventionStage.encadreurStructure.user.prenom,fontSize:11.1},
          {text:'Qualité         : '+this.conventionStage.encadreurStructure.qualite,fontSize:11.1},
          {text:'Téléphone   : '+this.conventionStage.encadreurStructure.user.tele,fontSize:11.1},
          {text:'E-mail          : '+this.conventionStage.encadreurStructure.user.email,fontSize:11.1},
          {text:'Article 6 : Gratification ',fontSize:11.1,bold:true,margin:[0,20,0,0]},
          {text:'L’étudiant ne peut prétendre à rémunération, cependant il peut bénéficier d’une gratification. Les frais de déplacement et d’hébergement engagés par l’étudiant àla demande de l’Organisme, ainsi que les frais de formationéventuellement nécessités par le stage, seront intégralement pris encharge par l’Organisme selon les modalités qui y sont en vigueur.',fontSize:11.1},
          {text:'Article 7 : Responsabilité civile et assurances',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'Le stagiaire s’engage à se couvrir par un contrat d’assurance individuelle',fontSize:11.1},
          {text:'Lorsque l’Organisme met un véhicule à la disposition du stagiaire,il lui incombe de vérifier préalablement que la police d’assurancedu véhicule couvre son utilisation par un étudiant.',fontSize:11.1},
          {text:'Article 8 : Discipline',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'Durant son stage, l’étudiant est soumis à la discipline et aurèglement intérieur de l’Organisme, notamment en ce qui concerneles horaires, et les règles d’hygièneet de sécurité en vigueur dans l’Organisme.',fontSize:11.1},
          {text:'Toute sanction disciplinaire ne peut être décidée que parl’Établissement. Dans ce cas, l’Organisme informe l’Établissementdes manquements et lui fournit éventuellement les éléments constitutifs.',fontSize:11.1},
          {text:'En cas de manquement particulièrement grave à la discipline,l’Organisme se réserve le droit de mettre fin au stage de l’étudianttout en respectant les dispositions fixées à l’article 10 de la présenteconvention.',fontSize:11.1},
          {text:'Article 9 : Fin de stage –Rapport –Evaluation',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'A l’issue du stage, l’Organisme délivre au stagiaire une attestationde stage et remplit une fiche d’évaluation qu’il retourneà l’Établissement. Selon les règlements pédagogiques en vigueur,l’étudiant sera susceptible de fournir un rapport. Ce rapport ainsique les éventuels travaux associés pourront être présentés lorsd’une soutenance.',fontSize:11.1},
          {text:'2/3',fontSize:12.1,bold:true,alignment:'right',margin:[0,60,0,0]},
          {text:'_____________________________________________________________________________________________',fontSize:12.1,alignment:'center'},
          {text:'Convention de stage FSTG/                                                                    -Etudiant -',alignment:'center',fontSize:12.1,bold:true},

          {text:'Le responsable direct du stagiaire ou tout autre membre del\'Organisme appelé à se rendre à l\'Établissement dans le cadre de lapréparation, du déroulement et de la validation du stage ne peutprétendre à une quelconque prise en charge ou indemnisationde lapart de l\'Établissement.',fontSize:11.1,margin:[0,80,0,0]},
          {text:'Article 10 : Absence et Interruption du stageInterruption temporaire',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'Au cours du stage, le stagiaire pourra bénéficier de congés sousréserve que la durée minimale du stage soit respectée.',fontSize:11.1},
          {text:'Pour toute autre interruption temporaire du stage (maladie,maternité, absence injustifiée...) l’Organisme avertira leResponsable de l’Établissement par courrier.',fontSize:11.1},
          {text:'Article 11 : Devoir de réserve et confidentialité',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'Le devoir de réserve est de rigueur absolue. Les étudiants stagiaires prennent donc l’engagement de n’utiliser en aucun cas les informations recueillies ou obtenues par eux pour en faire l’objetde publication, communication à des tiers sans accord préalable dela Direction de l’Organisme, y compris le rapport de stage. Cet engagement vaudra non seulement pour la durée du stage mais également après son expiration. L’étudiant s’engage à ne conserver, emporter, ou prendre copie d’aucun document ou logiciel, de quelque nature que ce soit, appartenant à l’Organisme, sauf accord de ce dernier.',fontSize:11.1},
          {text:'Article 12 : Recrutement',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'Le stagiaire n’est lié par aucun contrat de travail avec l’organisme qui l’accueille.',fontSize:11.1},
          {text:'S’il advenait qu’un contrat de travail prenant effet avant la date defin du stage soit signé avec l’Organisme la présente conventiondeviendrait caduque ; l’ « étudiant » ne relèverait plus de la responsabilité de l’Établissement. Ce dernier devraitimpérativement en être averti avant la signature du contrat.',fontSize:11.1},
          {text:'Article 13 : Droit applicable –Tribunaux compétents',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'La présente convention est régie exclusivement par le droitmarocain. Tout litige non résolu par voie amiable sera soumis à lacompétence de la juridiction marocainecompétente.',fontSize:11.1},
          {text:'Lu et approuvé',fontSize:12.1,alignment:'center',margin:[0,20,0,0],bold:true},
          {text:'Le stagiaire: ',fontSize:12.1,alignment:'center',bold:true},
          {text:'..........., le............',fontSize:12.1,alignment:'center',bold:true},
          {text:'Le Responsable de l\'Organisme d’Accueil ou son délégué',fontSize:12.1,margin:[0,40,0,0],bold:true},
          {text:'.................., le.............',fontSize:12.1,bold:true},
          {text:'Pour l’établissement,',fontSize:12.1,bold:true,margin:[0,40,0,0]},
          {text:'Le Responsable de la Filière                                                                                            Le Doyen',fontSize:12.1,bold:true,margin:[0,20,0,0]},
          {text:'.................., le................                                                                                        ..........., le.............  ',fontSize:12.1,bold:true},
          {text:'3/3',fontSize:12.1,bold:true,alignment:'right',margin:[0,60,0,0]},
          {text:'_____________________________________________________________________________________________',fontSize:12.1,alignment:'center'},
          {text:'Convention de stage FSTG/                                                                    -Etudiant -',alignment:'center',fontSize:12.1,bold:true}
      ]

  }

  }


  anneeUniversitaire(){
    let d = new Date();
    let year = d.getFullYear();
    let date = "";
    if(d.getMonth() == 8 || d.getMonth() == 9 || d.getMonth() == 10 || d.getMonth() == 11){
      date = year+"/"+(year+1);
    }else{
      date = year-1+"/"+year;
    }
    return date;
  }



}
