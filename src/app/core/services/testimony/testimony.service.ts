import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TestimonyService {

  private http = inject(HttpClient)

  private readonly testimonyBaseUrl = environment.baseUrl + "testimonies";

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };


  addRubric(rublicToSave: any): Observable<any>{
    return this.http.post<any>(this.testimonyBaseUrl, rublicToSave, this.httpOptions)
  }

  editRubric(id: string , rubricData: any): Observable<any>{
    return this.http.put<any>(this.testimonyBaseUrl+`/${id}`, rubricData, this.httpOptions);
  }


  deleteRubric(id: number): Observable<any>{
    return this.http.delete<any>(this.testimonyBaseUrl+`/${id}`)
  }
  getBlogRubricById(id : string): Observable<any>{
    return this.http.get<any>(this.testimonyBaseUrl+`/${id}`, this.httpOptions)
  }

  getTestimoniesList() : Observable<any>{

    return of(
      [
    {
      title: "Un soutien inestimable en moment de deuil",
      message: "Lorsque mon père est décédé, l’association a réagi avec une rapidité et une humanité incroyables. Grâce à l’aide reçue, nous avons pu organiser des obsèques dignes de son rang. En tant qu’ayant droit, je ne m’attendais pas à autant de solidarité.",
      name: "Julienne Ebanga",
      image: "/img/about/team/1.jpeg",
      date: "2024-12-15",
      role: "Ayant droit",
      lieu: "Douala, Cameroun"
    },
    {
      title: "Une grande famille pour les Bassa",
      message: "Depuis que je suis membre, je me sens entouré, soutenu. Ce n’est pas qu’une aide financière, c’est aussi une fraternité. Nous portons nos traditions et notre solidarité comme un flambeau.",
      name: "Jean-Marie Mballa",
      image: "/img/about/team/2.jpeg",
      date: "2023-08-27",
      role: "Adhérent",
      membreDepuis: 2018,
      lieu: "Paris, France"
    },
    {
      title: "Un engagement qui donne du sens",
      message: "J’ai rejoint l’association pour ne pas être seul en cas de coup dur. Mais j’ai trouvé bien plus : des rencontres, des échanges, et surtout la fierté de contribuer à notre communauté.",
      name: "Clarisse Ndongo",
      image: "/img/about/team/3.jpeg",
      date: "2025-01-10",
      role: "Adhérente",
      membreDepuis: 2021,
      lieu: "Yaoundé, Cameroun"
    },
    {
      title: "Un geste qui a tout changé",
      message: "Les 15 000 euros ont permis à ma famille de traverser une période très difficile avec dignité. Je remercie profondément chaque membre qui a rendu cela possible.",
      name: "Franck Nguimfack",
      image: "/img/about/team/4.jpeg",
      date: "2024-02-02",
      role: "Ayant droit",
      lieu: "Lyon, France"
    },
    {
      title: "Être solidaire, c’est préserver nos valeurs",
      message: "En tant qu’adhérent, je sais que ma cotisation sert à quelque chose de noble. C’est aussi une manière de transmettre nos valeurs à nos enfants, même en diaspora.",
      name: "Roger Bebey",
      image: "/img/about/team/5.jpg",
      date: "2023-06-30",
      role: "Adhérent",
      membreDepuis: 2020,
      lieu: "Bruxelles, Belgique"
    },
    {
      title: "Une vraie assurance communautaire",
      message: "Dans les moments les plus sombres, cette association brille comme une étoile. J’en parle à tous les jeunes Bassa autour de moi : ne restez pas en marge.",
      name: "Linda Assiga",
      image: "/img/about/team/6.jpeg",
      date: "2024-09-21",
      role: "Adhérente",
      membreDepuis: 2022,
      lieu: "Limbé, Cameroun"
    },
    {
      title: "Une promesse tenue jusqu’au bout",
      message: "Mon oncle était membre depuis longtemps. Lorsqu’il est parti, l’association a respecté tous ses engagements. Je me suis inscrite dans la foulée.",
      name: "Estelle Mvondo",
      image: "/img/about/team/7.jpeg",
      date: "2024-04-04",
      role: "Ayant droit puis Adhérente",
      membreDepuis: 2024,
      lieu: "Toronto, Canada"
    },
    {
      title: "Solidarité Bassa au-delà des frontières",
      message: "Même à l’étranger, je me sens relié à ma culture et à mon peuple. Cette association me permet de contribuer à un projet commun qui a du sens.",
      name: "Alain Dikongué",
      image: "/img/about/team/1.jpeg",
      date: "2023-11-18",
      role: "Adhérent",
      membreDepuis: 2017,
      lieu: "Berlin, Allemagne"
    },
    {
      title: "Ils étaient là quand j’en avais besoin",
      message: "Je n’oublierai jamais ce que l’association a fait pour ma famille après le décès de ma sœur. C’était bien plus qu’un soutien financier, c’était de l’amour communautaire.",
      name: "Pauline Essomba",
      image: "/img/about/team/1.jpeg",
      date: "2025-03-12",
      role: "Ayant droit",
      lieu: "Ebolowa, Cameroun"
    },
    {
      title: "Un exemple de solidarité africaine moderne",
      message: "Ce modèle mérite d’être reproduit partout. Il combine respect des traditions et efficacité. Je suis fier d’en faire partie et j’encourage chaque Bassa à nous rejoindre.",
      name: "Brice Mvele",
      image: "/img/about/team/1.jpeg",
      date: "2023-10-05",
      role: "Adhérent",
      membreDepuis: 2019,
      lieu: "Marseille, France"
    }
  ]
    )

    /*
    return this.http.get<any>(this.testimonyBaseUrl).pipe(
      map(({status,data, message})=> data)
    )

    */
  }
}
