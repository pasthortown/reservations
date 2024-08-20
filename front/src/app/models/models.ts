export interface MenuItem {
  img: string;
  title: string;
}

export interface HeroItem extends MenuItem {
  img: string;
  title: string;
  hosted: string;
  status: string;
}

export interface CategoryHero {
  categoryTitle: string;
  children: HeroItem[];
}

export interface FormDefault {
  title: string;
  subTitle: string;
}
