// Public judging deployment: never forward API, auth, or mutation requests.
export function sampleWorker(app) {
  return {
    async fetch(request, env, ctx) {
      const path = new URL(request.url).pathname;
      const headers = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
      if (!['GET','HEAD'].includes(request.method))
        return Response.json({error:'This judging demo cannot make calls or save live data.'},{status:405,headers});
      if (path === '/api/capabilities')
        return Response.json({sampleOnly:true,signedIn:false,operator:false,liveReady:false},{headers});
      if (path.startsWith('/api/') || path === '/api' || path.startsWith('/signin') || path.startsWith('/signout') || path === '/callback')
        return Response.json({error:'Live tools are disabled on this sample-only demo.'},{status:403,headers});
      const clean = new Headers(request.headers);
      for (const key of [...clean.keys()]) if(key.startsWith('oai-')) clean.delete(key);
      // No account credentials or database bindings reach the application.
      return app.fetch(new Request(request,{headers:clean}),{},ctx);
    }
  };
}
