import org.eclipse.jetty.util.ssl.SslContextFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.KeyStore;
import java.security.cert.CRL;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomSslContextFactory extends SslContextFactory {
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomSslContextFactory.class);

    protected TrustManager[] getTrustManagers(KeyStore trustStore, Collection<!--? extends CRL--> crls) throws Exception {
        TrustManager[] trustManagers = super.getTrustManagers(trustStore, crls);
        List<trustmanager> managers = new ArrayList<>();
        for (TrustManager trustManager : trustManagers) {
            if (trustManager instanceof X509TrustManager) {
                managers.add(new CustomX509TrustManager((X509TrustManager) trustManager));
            } else {
                managers.add(trustManager);
            }
        }
        return managers.toArray(new TrustManager[managers.size()]);
    }

    protected static class CustomX509TrustManager implements X509TrustManager {
        private X509TrustManager trustManager;

        public CustomX509TrustManager(X509TrustManager trustManager) {
            this.trustManager = trustManager;
        }

        @Override
        public void checkClientTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
            try {
                trustManager.checkClientTrusted(x509Certificates, s);
            } catch (Exception e) {
                LOGGER.error("Client certificate was found to be invalid", e);
                LOGGER.error("Client certificate chain:");

                for (int i = 0; i < x509Certificates.length; i++) {
                    X509Certificate x509Certificate = x509Certificates[i];
                    LOGGER.error("chain[{}]: {}", i, x509Certificate);
                }

                X509Certificate[] acceptedIssuers = getAcceptedIssuers();
                if (acceptedIssuers == null || acceptedIssuers.length == 0) {
                    LOGGER.error("There are no accepted issuers.");
                } else {
                    LOGGER.error("The accepted certificates are:");
                    for (X509Certificate acceptedIssuer : acceptedIssuers) {
                        LOGGER.error("{}", acceptedIssuer.toString());
                    }
                }

                throw e;
            }
        }

        @Override
        public void checkServerTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
            trustManager.checkServerTrusted(x509Certificates, s);
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return trustManager.getAcceptedIssuers();
        }
    }
}