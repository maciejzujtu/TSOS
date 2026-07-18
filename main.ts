import { Wrapper, APIREF, APISRV } from '@/index';

const w = new Wrapper("apps.usos.uj.edu.pl", "", "")

w.POST(APISRV, "CONSUMER");
